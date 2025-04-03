import { defineMiddleware } from "astro:middleware";
import { getApi } from "bknd/adapter/astro";

const excludedPaths = [
    "/api/auth/me",
]

export const onRequest = defineMiddleware(async (context, next) => {
    if (excludedPaths.includes(context.url.pathname)) {
        return next()
    }

    const api = await getApi(context, { mode: "dynamic" });
    const user = api.getUser();

    if (user) {
        context.locals.user = user;
    } else {
        context.locals.user = null;
    }

    return next()
})