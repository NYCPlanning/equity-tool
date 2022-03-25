import React from "react";
import { Box, Divider, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GeographyInfo } from "@components/GeographyInfo";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { DRISelection } from "@components/SidebarContent/DRISelection";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { useClearSelection } from "@helpers/useClearSelection";
import { NYC } from "@constants/geoid";
import { Geography } from "@constants/geography";
import { CategoryMenu } from "@components/CategoryMenu";
import { SubindicatorBin } from "@components/SidebarContent";

export const SidebarContent = () => {
  const { view, geoid, geography } = useMapSubrouteInfo();
  const clearSelection = useClearSelection();

  const ntaIndexes: { [index: string]: any } = {
    BK29: "Highest",
    BK28: "Highest",
    BK88: "Higher",
    BK19: "Highest",
    BK09: "Lowest",
    BK33: "Lowest",
    MN03: "Higher",
    MN27: "Higher",
    MN15: "Lower",
    BK61: "Intermediate",
    BX14: "Highest",
    BK91: "Higher",
    BK95: "Intermediate",
    BK68: "Intermediate",
    QN19: "Lowest",
    MN21: "Lowest",
    BK26: "Higher",
    BK41: "Highest",
    BX33: "Highest",
    BK44: "Intermediate",
    MN06: "Higher",
    QN30: "Lower",
    QN21: "Lower",
    MN17: "Lowest",
    BK43: "Higher",
    BX35: "Highest",
    BX39: "Highest",
    BK79: "Intermediate",
    BK46: "Intermediate",
    QN71: "Intermediate",
    BK37: "Lowest",
    BK64: "Lowest",
    QN68: "Higher",
    BK96: "Higher",
    BK17: "Intermediate",
    MN24: "Lowest",
    QN72: "Lower",
    BK35: "Intermediate",
    MN36: "Higher",
    MN23: "Lowest",
    BK72: "Higher",
    QN63: "Intermediate",
    BX31: "Lower",
    SI01: "Lowest",
    SI48: "Lowest",
    QN70: "Intermediate",
    QN48: "Intermediate",
    QN76: "Lower",
    BK27: "Higher",
    MN25: "Lowest",
    BK31: "Lower",
    QN46: "Lower",
    BK75: "Higher",
    BX05: "Highest",
    QN43: "Intermediate",
    BX06: "Highest",
    QN10: "Lowest",
    QN35: "Higher",
    BX07: "Highest",
    BK81: "Higher",
    BK77: "Highest",
    BK78: "Higher",
    QN33: "Lowest",
    BK50: "Lower",
    MN11: "Intermediate",
    SI11: "Lowest",
    BX01: "Higher",
    BK69: "Lower",
    QN23: "Higher",
    BX13: "Lower",
    QN25: "Highest",
    BX75: "Highest",
    BK63: "Intermediate",
    BK83: "Highest",
    QN45: "Lower",
    BK38: "Lower",
    BK30: "Higher",
    QN27: "Higher",
    QN52: "Higher",
    MN34: "Higher",
    MN33: "Intermediate",
    BK82: "Highest",
    BK85: "Highest",
    BX17: "Highest",
    MN22: "Lowest",
    BK90: "Intermediate",
    BX03: "Intermediate",
    QN29: "Highest",
    QN50: "Intermediate",
    QN15: "Intermediate",
    BK42: "Highest",
    BK58: "Lower",
    QN22: "Highest",
    BX40: "Highest",
    QN17: "Lower",
    QN41: "Intermediate",
    QN47: "Lower",
    BK45: "Lowest",
    QN44: "Lowest",
    SI14: "Lower",
    SI54: "Lowest",
    BK76: "Lower",
    SI08: "Lower",
    MN04: "Higher",
    QN12: "Intermediate",
    BX26: "Highest",
    QN07: "Lower",
    BK25: "Higher",
    MN13: "Lowest",
    QN31: "Intermediate",
    BX27: "Highest",
    QN28: "Higher",
    QN61: "Higher",
    QN06: "Intermediate",
    QN60: "Lower",
    QN37: "Higher",
    BX30: "Highest",
    QN66: "Lower",
    MN31: "Lowest",
    MN14: "Lowest",
    QN57: "Lowest",
    MN28: "Higher",
    MN01: "Higher",
    SI12: "Higher",
    BX34: "Highest",
    MN09: "Lower",
    BX41: "Highest",
    QN51: "Higher",
    MN20: "Lowest",
    SI35: "Intermediate",
    SI45: "Lowest",
    SI05: "Lowest",
    QN26: "Higher",
    BX22: "Lowest",
    BK73: "Lower",
    BX43: "Highest",
    QN42: "Lower",
    SI25: "Intermediate",
    SI36: "Lowest",
    QN56: "Intermediate",
    BX46: "Intermediate",
    BX10: "Lower",
    BX49: "Intermediate",
    QN38: "Intermediate",
    SI28: "Lower",
    BK60: "Highest",
    QN34: "Lower",
    QN62: "Higher",
    QN18: "Intermediate",
    QN54: "Intermediate",
    QN20: "Intermediate",
    QN05: "Lowest",
    SI32: "Lowest",
    BX52: "Lower",
    BK21: "Higher",
    BX55: "Highest",
    BX09: "Intermediate",
    QN01: "Intermediate",
    QN55: "Intermediate",
    QN02: "Lower",
    QN03: "Lower",
    BX29: "Lower",
    QN08: "Lower",
    SI37: "Lower",
    BK93: "Intermediate",
    MN50: "Lowest",
    BK34: "Highest",
    BK32: "Highest",
    SI24: "Lowest",
    MN19: "Lowest",
    BX36: "Highest",
    MN40: "Lowest",
    MN12: "Lowest",
    BX28: "Highest",
    BX37: "Higher",
    MN35: "Higher",
    BK23: "Lower",
    BX63: "Highest",
    BX08: "Highest",
    SI22: "Lower",
    BX59: "Highest",
    SI07: "Lowest",
    QN49: "Lower",
    BX44: "Higher",
    BK40: "Lowest",
    QN53: "Intermediate",
    BX62: "Lower",
    MN32: "Lowest",
  };

  if (geoid != null) {
    return (
      <>
        <Box>
          <Button
            padding="1.5rem 1rem"
            variant="ghost"
            bg="rgba(0,0,0,0)"
            color="gray.500"
            leftIcon={<ArrowBackIcon />}
            aria-label="Exit Data Tool Selection"
            data-cy="exitDataToolSelection-desktop"
            onClick={clearSelection}
          >
            back
          </Button>
        </Box>
        <Box padding="0 1rem 1.5rem 1rem">
          <GeographyInfo
            geoid={geoid}
            geography={geography}
            fontSize="1.5625rem"
          />
          {view === "dri" && <SubindicatorBin bin={ntaIndexes[geoid]} />}
        </Box>
        <Divider color={"gray.200"} my={"1.5rem"} />
        {view === "dri" && <DRISelection />}
        {view === "datatool" && (
          <CategoryMenu
            geography={geography ? geography : Geography.CITYWIDE}
            geoid={geography && geoid ? geoid : NYC}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Box
        height="100%"
        justify="space-between"
        padding="2rem 1rem"
        paddingBottom="0rem"
      >
        <WelcomeContent />
      </Box>
      <Box padding="2rem 1rem" paddingTop="0rem">
        <WelcomeFooter />
      </Box>
    </>
  );
};
