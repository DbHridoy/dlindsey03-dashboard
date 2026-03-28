import { store } from "../store";
import {
  clearSession,
  setSession,
  updateCurrentUser,
} from "../store/slices/authSlice";

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5100/api/v1";

function buildUrl(path, query) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        value === false
      ) {
        return;
      }

      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

function normalizeErrorMessage(message) {
  if (Array.isArray(message)) {
    return message.join(", ");
  }

  if (message && typeof message === "object") {
    return Object.values(message).flat().join(", ") || "Request failed";
  }

  return message || "Request failed";
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return null;
}

async function refreshAccessToken() {
  const response = await fetch(buildUrl("/auth/refresh-token"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload = await parseResponse(response);

  if (!response.ok || !payload?.accessToken) {
    throw new Error(normalizeErrorMessage(payload?.message) || "Unable to refresh session");
  }

  const currentUser = store.getState().auth.user;

  store.dispatch(
    setSession({
      accessToken: payload.accessToken,
      user: currentUser,
    }),
  );

  return payload.accessToken;
}

async function performRequest(path, options = {}, hasRetried = false) {
  const state = store.getState().auth;
  const token = options.token ?? state.accessToken;
  const headers = new Headers(options.headers || {});
  const isFormData = options.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type") && options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(path, options.query), {
    method: options.method || "GET",
    credentials: "include",
    headers,
    body:
      options.body === undefined
        ? undefined
        : isFormData
          ? options.body
          : JSON.stringify(options.body),
  });

  const payload = await parseResponse(response);

  if (response.ok) {
    return payload;
  }

  if (
    !hasRetried &&
    response.status === 401 &&
    path !== "/auth/login" &&
    path !== "/auth/refresh-token"
  ) {
    try {
      const refreshedToken = await refreshAccessToken();
      return performRequest(
        path,
        {
          ...options,
          token: refreshedToken,
        },
        true,
      );
    } catch {
      store.dispatch(clearSession());
    }
  }

  throw new Error(normalizeErrorMessage(payload?.message));
}

export async function apiRequest(path, options = {}) {
  return performRequest(path, options);
}

export async function loginUser(credentials) {
  const payload = await apiRequest("/auth/login", {
    method: "POST",
    body: credentials,
  });

  store.dispatch(
    setSession({
      accessToken: payload.data.accessToken,
      user: payload.data.user,
    }),
  );

  return payload;
}

export async function logoutUser() {
  try {
    await apiRequest("/auth/logout", {
      method: "POST",
    });
  } finally {
    store.dispatch(clearSession());
  }
}

export async function getCurrentUser() {
  const payload = await apiRequest("/user/me");
  store.dispatch(updateCurrentUser(payload.data));
  return payload.data;
}
