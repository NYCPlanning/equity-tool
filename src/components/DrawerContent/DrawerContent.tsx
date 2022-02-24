import React from "react";
import { GeographyInfo } from "@components/GeographyInfo";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { DRISelection } from "@components/SidebarContent/DRISelection";

export const DrawerContent = () => {
  const { view, geoid } = useMapSubrouteInfo();

  if (geoid !== null) {
    return (
      <>
        <GeographyInfo />

        {view === "dri" && <DRISelection />}
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
