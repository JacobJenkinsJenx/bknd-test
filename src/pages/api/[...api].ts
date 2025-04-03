export const prerender = false;

import { serve } from "bknd/adapter/astro";

export const ALL = serve({
    connection: {
        url: `file:${ process.cwd() }/test.db`,
    }
});