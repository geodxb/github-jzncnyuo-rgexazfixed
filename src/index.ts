export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    try {
      // Try to fetch the requested file from the assets
      const assetResponse = await env.ASSETS.fetch(request);
      
      // If the asset exists (not 404), return it
      if (assetResponse.status !== 404) {
        return assetResponse;
      }

      // If it's a 404 and the path doesn't look like a file (no extension),
      // serve index.html for SPA routing
      if (!pathname.includes('.')) {
        const indexRequest = new Request(new URL('/index.html', request.url), request);
        return await env.ASSETS.fetch(indexRequest);
      }

      // For actual missing files (with extensions), return the 404
      return assetResponse;
    } catch (error) {
      // Fallback to index.html for any errors
      try {
        const indexRequest = new Request(new URL('/index.html', request.url), request);
        return await env.ASSETS.fetch(indexRequest);
      } catch (fallbackError) {
        return new Response('Internal Server Error', { status: 500 });
      }
    }
  },
};

interface Env {
  ASSETS: Fetcher;
}