import React from "react";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";

export const DrawerContent = () => {
  const { geoid } = useMapSubrouteInfo();

  if (geoid !== null) {
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
