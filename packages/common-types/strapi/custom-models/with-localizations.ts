export type WithLocalizations<Type> = Type & { locale: string } & {
  localizations: (Partial<Type> & { locale: string })[];
};
export type WithLocalesMap<Type> = Type & {
  localesMap: { [p: string]: Partial<Type> };
};
