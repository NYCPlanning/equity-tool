import React from "react";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";

interface DrawerContentProps {
  isGeographySelected: boolean;
}

export const DrawerContent = ({ isGeographySelected }: DrawerContentProps) => {
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
