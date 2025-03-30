import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
export enum LangType {
  RU = "ru",
  EN = "en",
}
export type LangContextType = {
  lang: LangType;
  setLang: (
    langOrSetter: LangType | ((prevLang: LangType) => LangType)
  ) => void;
};

export const LangContext = createContext<LangContextType>({
  lang: LangType.EN,
  setLang: () => {},
});
export const LangProvider = ({ children }: PropsWithChildren<any>) => {
  const [lang, setLang] = useState<LangType>(LangType.EN);
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
export const useLang = () => useContext(LangContext);
