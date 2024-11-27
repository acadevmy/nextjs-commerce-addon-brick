import { useLocale, useTranslations } from "next-intl";

import { routing } from "@/i18n/routing";

import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

const LocaleSwitcher = () => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <div className="absolute top-8 right-8">
      <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {t("locale", { locale: cur })}
          </option>
        ))}
      </LocaleSwitcherSelect>
    </div>
  );
};

export default LocaleSwitcher;
