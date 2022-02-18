import React from "react";
import { DataToolGeographyInfo } from "@components/DataTool";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";

export const DrawerContent = () => {
  const { geography, geoid } = useMapSubrouteInfo();

  if (geoid !== null || geography === "citywide") {
    return (
      <>
        <DataToolGeographyInfo />
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
