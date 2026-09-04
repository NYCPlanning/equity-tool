import { createContext, ReactNode, useContext } from "react";
import { useAddressSearch } from "@hooks/useAddressSearch/useAddressSearch";

type AddressSearchContextValue = ReturnType<typeof useAddressSearch>;

const AddressSearchContext = createContext<
  AddressSearchContextValue | undefined
>(undefined);

export const AddressSearchProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const addressSearch = useAddressSearch();

  return (
    <AddressSearchContext.Provider value={addressSearch}>
      {children}
    </AddressSearchContext.Provider>
  );
};

export const useAddressSearchContext = () => {
  const context = useContext(AddressSearchContext);

  if (context === undefined) {
    throw new Error(
      "useAddressSearchContext function must be used in AddressSearchProvider"
    );
  }

  return context;
};
