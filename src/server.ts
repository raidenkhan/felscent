import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import { createServerEntry } from "@tanstack/react-start/server-entry";

// createStartHandler returns the request handler itself, not a wrapper object.
const ssrHandler = createStartHandler(defaultStreamHandler);

/**
 * SSR entry — see `tanstackStart.server.entry` in vite.config.ts.
 *
 * Wraps the default Start handler so an unexpected render error returns a plain
 * branded 500 page instead of an empty or half-streamed response. Once the
 * stream has started the runtime cannot swap the status code, so this is a
 * best-effort guard, not a substitute for route-level error boundaries.
 */
export default createServerEntry({
  async fetch(request, opts) {
    try {
      return await ssrHandler(request, opts);
    } catch (error) {
      console.error("[felscent] Unhandled SSR error", error);
      return new Response(
        `<!doctype html><html lang="en-GB"><head><meta charset="utf-8" />
<title>Felscent — temporarily unavailable</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center;
         background: #F4F0E8; color: #171513; text-align: center;
         font-family: "Helvetica Neue", Arial, sans-serif; font-weight: 300; }
  h1 { font-family: Georgia, serif; font-weight: 400; font-size: 2rem; margin: 0 0 0.5rem; }
  p { margin: 0; color: #6B6259; }
</style></head>
<body><main><h1>Felscent</h1><p>Something went wrong. Please try again in a moment.</p></main></body></html>`,
        { status: 500, headers: { "content-type": "text/html; charset=utf-8" } },
      );
    }
  },
});
