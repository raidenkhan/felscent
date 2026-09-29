import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * Router entry. TanStack Start resolves this file from src/router.tsx and calls
 * `getRouter()` on both the server and the client, so it must stay free of
 * browser-only APIs.
 */
export function getRouter() {
  return createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
  });
}
