import { useLocale as i18UseLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { getLocale as i18nGetLocale } from "next-intl/server";

import { defaultLocale, Locale, locales } from "@/i18n/i18nConfig";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// Regular components
export const useLocale = () => i18UseLocale() as Locale;
export const getLocale = () => i18nGetLocale() as Promise<Locale>;
