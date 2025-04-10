import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Switch,
  Flex,
} from "@chakra-ui/react";
import { IconPanel } from "@components/Map/IconPanel";
import {
  MapLayersIcon,
  LayerSelectionSquareCD,
  LayerSelectionSquareNTA,
} from "@components/Icons";
import { View } from "@constants/View";
import { useView } from "@hooks/useView";
import { isWinOS } from "@helpers/detectWindowsOS";

export interface AdditionalLayersPanelProps {
  onToggleNtaLayer: () => void;
  onToggleDistrictLayer: () => void;
}

export const AdditionalLayersPanel = ({
  onToggleNtaLayer,
  onToggleDistrictLayer,
}: AdditionalLayersPanelProps) => {
  const view = useView();
  return (
    <IconPanel
      heading="Additional Layers"
      icon={<MapLayersIcon />}
      aria-label="Show additional map layer options"
      height={{ base: "204px", md: isWinOS() ? "200px" : "180px" }}
      top={{
        base: view === View.DATA ? "11rem" : "7.75rem",
        md: view === View.DATA ? "14.5rem" : "11rem",
      }}
      width={{ base: "290px", md: "364px" }}
      zIndex={"100"}
    >
      <FormControl display={"flex"} gap={"0.5rem"} marginBottom={"0.5rem"}>
        <Switch
          _focus={{
            boxShadow: "0 0 0 1px #e2e8f0",
          }}
          _focusVisible={{
            boxShadow: "0 0 0 1px #4A5568 !important",
          }}
          colorScheme={"gray"}
          defaultChecked={false}
          onChange={() => {
            onToggleNtaLayer();
          }}
        />

        <FormLabel marginBottom={"0"} fontWeight={"normal"}>
          <Box>Neighborhood Tabulation Area (NTA)</Box>
        </FormLabel>

        <LayerSelectionSquareNTA />
      </FormControl>
      <FormControl>
        <Flex gap={"0.5rem"} marginBottom={"0.5rem"}>
          <Switch
            marginTop={".125rem"}
            _focus={{
              boxShadow: "0 0 0 1px #e2e8f0",
            }}
            _focusVisible={{
              boxShadow: "0 0 0 1px #4A5568 !important",
            }}
            colorScheme={"gray"}
            defaultChecked={false}
            onChange={() => {
              onToggleDistrictLayer();
            }}
          />

          <FormLabel marginBottom={"0"} fontWeight={"normal"}>
            Community District (CD)*
          </FormLabel>

          <LayerSelectionSquareCD />
        </Flex>
        <FormHelperText
          marginLeft={"2.625rem"}
          fontSize={".8125rem"}
          fontStyle={"italic"}
          lineHeight={"2"}
        >
          *Approximated using data from Public Use Microdata Areas (PUMAs).
        </FormHelperText>
      </FormControl>
    </IconPanel>
  );
};
