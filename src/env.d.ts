/// <reference types="astro/client" />

namespace App {
    interface Locals {
        user: import("bknd").User | null;
    }
}