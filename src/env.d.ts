/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@astrojs/db/client" />

declare namespace App {
  interface Locals {
    auth?: {
      validate: () => Promise<{
        user?: {
          id: number;
          username: string;
          isAdmin: boolean;
        };
      } | null>;
    };
  }
}