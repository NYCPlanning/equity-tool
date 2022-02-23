import React from "react";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { DRISelection } from "@components/SidebarContent/DRISelection";
import { useView } from "@hooks/useView";

export const DrawerContent = () => {
  const { geoid } = useMapSubrouteInfo();
  const view = useView();

  if (geoid !== null) {
    if (view === "dri") {
      return (
        <>
          <DRISelection />
        </>
      );
    }
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
