const configuredBase = import.meta.env.BASE_URL || "/";

export const appBasePath = configuredBase === "/" ? "" : configuredBase.replace(/\/$/, "");

export function appPath(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${appBasePath}${normalizedPath}` || "/";
}

export function absoluteAppUrl(path = "/") {
  return new URL(appPath(path), window.location.origin).toString();
}
