import { createContext } from "react";

const TablesIsOpenContext = createContext({
  addSetIsOpen: (dispatch: React.Dispatch<boolean>): void => {
    console.log(dispatch);
  },
});

export default TablesIsOpenContext;
