import React from "react";
import WelcomeContent from "../useWelcomeContent";
import WelcomeFooter from "../useWelcomeFooter";

export const useDrawerContent = (isGeographySelected: boolean): JSX.Element => {
  if (isGeographySelected) {
    return (
      <>
        Either Data Tool Categories or DRI Indicators go here
        <br />
        (you can use useView() to determine which)
      </>
    );
  }

  return (
    <>
      <WelcomeContent />
      <br />
      <hr />
      <br />
      <WelcomeFooter />
    </>
  );
};
