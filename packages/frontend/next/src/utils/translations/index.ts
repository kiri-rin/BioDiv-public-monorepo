import { ruTranslations } from "./ru";
import { enTranslations } from "./en";
import { LangType, useLang } from "@/utils/translations/context";

export type Strings = typeof ruTranslations;
export const translations: { [p in LangType]: Partial<Strings> } = {
  [LangType.RU]: ruTranslations,
  [LangType.EN]: enTranslations,
};
export const useTranslations = () => {
  const { lang } = useLang();
  const strings = translations[lang];
  return strings as typeof ruTranslations;
};
