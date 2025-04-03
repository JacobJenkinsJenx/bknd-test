/**
 * That's just a helper file, totally optional, and can be adjusted to your liking.
 */

import type { AstroGlobal } from "astro";
import { getApp as getBkndApp } from "bknd/adapter/astro";
import config from "../bknd.config";

export { config };

export async function getApp() {
   return await getBkndApp(config);
}

export async function getApi(
   astro: AstroGlobal,
   opts?: { mode: "static" } | { mode?: "dynamic"; verify?: boolean }
) {
   const app = await getApp();
   if (opts?.mode !== "static" && opts?.verify) {
      const api = app.getApi({ headers: astro.request.headers });
      await api.verifyAuth();
      return api;
   }

   // getting the api from the `app` instance returns a local api
   // which doesn't travel the network.
   return app.getApi();
}
