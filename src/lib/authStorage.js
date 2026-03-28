const AUTH_STORAGE_KEY = "vaultlife-authenticated";

export function readAuthSession() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function writeAuthSession(isAuthenticated) {
  if (typeof window === "undefined") {
    return;
  }

  if (isAuthenticated) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
