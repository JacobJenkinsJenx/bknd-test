import { defineMiddleware } from "astro:middleware";
import { getApi } from "./bknd";
import type { AstroGlobal } from "astro";
const excludedPaths = ["/api/auth/me"];

export const onRequest = defineMiddleware(async (context, next) => {
   if (excludedPaths.includes(context.url.pathname)) {
      return next();
   }

   // I've uncommented this, because it potentially makes astro think that every route is dynamic
   // not sure about this, but it's outputting it as a warning in console
   // it's still totally valid though
   /* const api = await getApi(context as AstroGlobal, {
      mode: "dynamic",
      verify: true,
   }); */

   context.locals.user = null; // api.getUser();

   return next();
});
