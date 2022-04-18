import React, { createContext, useContext } from "react";

interface TablesIsOpenProviderProps {
  children: React.ReactNode;
  tablesSetIsOpens: React.Dispatch<boolean>[];
}

const TablesIsOpenContext = createContext<
  { addSetIsOpen: (dispatch: React.Dispatch<boolean>) => void } | undefined
>(undefined);

function TablesIsOpenProvider({
  tablesSetIsOpens,
  children,
}: TablesIsOpenProviderProps) {
  return (
    <TablesIsOpenContext.Provider
      value={{
        addSetIsOpen: (setIsOpen: React.Dispatch<boolean>) => {
          tablesSetIsOpens.push(setIsOpen);
        },
      }}
    >
      {children}
    </TablesIsOpenContext.Provider>
  );
}

function useTablesIsOpen() {
  const tablesIsOpenContext = useContext(TablesIsOpenContext);

  if (tablesIsOpenContext === undefined) {
    throw new Error(
      "useTablesIsOpen must be used within a TablesIsOpenProvider"
    );
  }

  return tablesIsOpenContext;
}

export { TablesIsOpenProvider, useTablesIsOpen };
