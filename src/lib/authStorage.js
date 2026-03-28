const AUTH_STORAGE_KEY = "vaultlife-auth-session";

export function readAuthSession() {
  if (typeof window === "undefined") {
    return {
      isAuthenticated: false,
      accessToken: "",
      user: null,
    };
  }

  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawValue) {
      return {
        isAuthenticated: false,
        accessToken: "",
        user: null,
      };
    }

    const parsedValue = JSON.parse(rawValue);

    return {
      isAuthenticated: Boolean(parsedValue?.accessToken),
      accessToken: parsedValue?.accessToken || "",
      user: parsedValue?.user || null,
    };
  } catch {
    return {
      isAuthenticated: false,
      accessToken: "",
      user: null,
    };
  }
}

export function writeAuthSession(session) {
  if (typeof window === "undefined") {
    return;
  }

  if (!session?.accessToken) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      accessToken: session.accessToken,
      user: session.user || null,
    }),
  );
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
