import { createContext, useContext } from "react";
import type { ReactNode } from "react";

type ProviderType = Record<any, any> | null | undefined;

interface ICommonProviderProps {
  value?: ProviderType;
  children: ReactNode;
}

export const CommonContext = createContext<ProviderType>(null);

export const CommonProvider = (props: ICommonProviderProps) => {
  const { value, children } = props;

  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
};

export const CommonConsumer = CommonContext.Consumer;

export const useCommonContext = () => {
  const commonContext = useContext(CommonContext);
  return commonContext;
};
