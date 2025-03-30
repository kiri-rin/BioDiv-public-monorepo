import {
  WithLocalesMap,
  WithLocalizations,
} from "@rrrcn/common-types/strapi/custom-models/with-localizations";
import { useMemo } from "react";
import { PaginatedResult } from "@rrrcn/common-types/strapi/models/Pagination";

export function createPaginatedResultLocalesMap<Type>(
  items: PaginatedResult<WithLocalizations<Type>> | null
) {
  if (!items) {
    return items;
  }
  return {
    ...items,
    results: items.results.map((item) => createLocalesMap(item)),
  };
}
export function createLocalesMap<Type>(item: WithLocalizations<Type>) {
  const localesMap: { [p: string]: Partial<Type> } = {};
  localesMap[item.locale] = item;
  const fieldsWithLocalizations: { [p: string]: WithLocalesMap<any> } = {};
  for (let [key, value] of Object.entries(item)) {
    if (
      typeof value === "object" &&
      value !== null &&
      value !== undefined &&
      Object.hasOwn(value, "localizations") &&
      Object.hasOwn(value, "locale")
    ) {
      console.log({ key });
      fieldsWithLocalizations[key] = createLocalesMap(
        value as WithLocalizations<any>
      );
    }
  }
  item.localizations?.forEach((localeItem) => {
    localesMap[localeItem.locale] = localeItem;
    for (let [key, value] of Object.entries(fieldsWithLocalizations)) {
      const localizedRelation =
        value.localesMap?.[localeItem.locale] !== undefined
          ? value.localesMap[localeItem.locale]
          : (item as any)[key];
      //@ts-ignore
      localesMap[localeItem.locale][key] = localizedRelation;
    }
  });
  return { ...item, localesMap };
}
export function getLocaleEntry<Type>(
  item: WithLocalizations<Type>,
  locale: string
) {
  let res: Type;
  if (locale === item.locale) {
    res = item;
  }
  for (let [key, value] of Object.entries(item)) {
  }
}
