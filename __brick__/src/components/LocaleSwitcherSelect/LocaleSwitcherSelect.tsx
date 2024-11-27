"use client";

import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode } from "react";

import { Locale } from "@/i18n/i18nConfig";
import { usePathname, useRouter } from "@/i18n/routing";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

const LocaleSwitcherSelect = ({ children, defaultValue, label }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <label className="relative text-gray-400">
      <p>{label}</p>
      <select
        className="inline-flex bg-transparent border p-2 mt-2"
        defaultValue={defaultValue}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
};

export default LocaleSwitcherSelect;
