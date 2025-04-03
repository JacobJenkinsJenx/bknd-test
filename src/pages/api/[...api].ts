export const prerender = false;

import { serve } from "bknd/adapter/astro";
import { config } from "../../bknd";

export const ALL = serve(config);
