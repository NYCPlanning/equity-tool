import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Switch,
  Text,
} from "@chakra-ui/react";
import {
  MapLayersIcon,
  LayerSelectionSquareCD,
  LayerSelectionSquareNTA,
} from "@components/Icons";
import { useView } from "@hooks/useView";

export interface AdditionalMapLayersProps {
  onToggleNtaLayer: () => void;
  onToggleDistrictLayer: () => void;
}

export const AdditionalMapLayers = ({
  onToggleNtaLayer,
  onToggleDistrictLayer,
}: AdditionalMapLayersProps) => {
  const view = useView();

  const [additionalLayerButtonSelected, setAdditionalLayerButtonSelected] =
    useState<boolean>(false);

  const [additionaLayerToggleSelected, setAdditionaLayerToggleSelected] =
    useState<boolean>(false);

  const handleLayerButtonClick = () => {
    setAdditionalLayerButtonSelected((current) => !current);
  };

  const handleLayerToggleClick = () => {
    setAdditionaLayerToggleSelected((current) => !current);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Box
          className="popoverWrapper"
          gridGap={"0.5rem"}
          position={"absolute"}
          top={{
            base: view === "data" ? "10.5rem" : "7.5rem",
            md: view === "data" ? "14.5rem" : "11rem",
          }}
          left={{
            base: ".5rem",
            md: view === "data" ? "1rem" : "1rem",
          }}
          zIndex={"99"}
        >
          <Button
            className="outerButton"
            leftIcon={<MapLayersIcon />}
            minWidth={"auto"}
            padding={"0"}
            width={"1.875rem"}
            height={"1.875rem"}
            boxShadow={"0 0 0 1px rgba(0, 0, 0, .2)"}
            variant={"outline"}
            position={{
              base: "relative",
              md: "initial",
            }}
            _hover={{ color: "currentColor" }}
            onClick={handleLayerButtonClick}
          ></Button>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        position={"absolute"}
        maxWidth={"25rem"}
        top={{
          base: "-2.5rem",
          md: "-3rem",
        }}
        left={{
          base: "-1.2rem",
          md: "-1.7rem",
        }}
        _focus={{
          boxShadow: "0 0 0 1px #e2e8f0",
        }}
      >
        <PopoverHeader
          className="popoverHeaderWrapper"
          display={"flex"}
          flexDirection={"row"}
          gridGap={"0.5rem"}
          alignItems={"center"}
          padding={{
            base: "0 .5625rem .5625rem .25rem",
            md: ".5625rem",
          }}
          borderBottom={"none"}
          fontWeight={"bold"}
          fontSize={"1.25rem"}
        >
          <Button
            className="innerButton"
            leftIcon={<MapLayersIcon />}
            minWidth={"auto"}
            padding={"0"}
            backgroundColor={"white"}
            flexGrow={"0"}
            width={"1.875rem"}
            height={"1.875rem"}
            variant={"outline"}
            _hover={{ color: "currentColor" }}
            visibility={"hidden"}
            style={{
              visibility: additionalLayerButtonSelected ? "visible" : "hidden",
            }}
          ></Button>
          <Text className="addLayerOptions" flexGrow={"2"}>
            Additional Layers
          </Text>
        </PopoverHeader>
        <PopoverBody>
          <FormControl
            className="nta-wrapper"
            display={"flex"}
            alignItems={"center"}
            gridGap={".5rem"}
            left={{
              base: "-.5rem",
              md: "initial",
            }}
          >
            <Switch
              className="nta-switch"
              _focus={{
                boxShadow: "0 0 0 1px #e2e8f0",
              }}
              _focusVisible={{
                boxShadow: "0 0 0 1px #4A5568 !important",
              }}
              defaultChecked={false}
              colorScheme={additionaLayerToggleSelected ? "gray" : "gray"}
              onChange={() => {
                onToggleNtaLayer();
                handleLayerToggleClick();
              }}
            />
            <FormLabel marginBottom={"0"} fontWeight={"normal"}>
              <Box
                display={"grid"}
                gridTemplateColumns={{
                  base: "2fr 1fr",
                  md: "repeat(6, 1fr)",
                }}
                gridGap={".5rem"}
                alignItems={"center"}
              >
                <Box
                  className="nta-text"
                  gridColumn={{
                    base: "initial",
                    md: "span 5",
                  }}
                  width={{
                    base: "initial",
                    md: "18rem",
                  }}
                >
                  Neighborhood Tabulation Area (NTA)
                </Box>
                <Box className="nta-square" justifySelf={"end"}>
                  <LayerSelectionSquareNTA />
                </Box>
              </Box>
            </FormLabel>
          </FormControl>
          <FormControl
            className="cd-wrapper"
            display={"flex"}
            alignItems={"top"}
            gridGap={".5rem"}
            paddingTop={"1rem"}
            left={{
              base: "-0.5rem",
              md: "initial",
            }}
          >
            <Switch
              className="cd-switch"
              marginTop={".125rem"}
              _focus={{
                boxShadow: "0 0 0 1px #e2e8f0",
              }}
              _focusVisible={{
                boxShadow: "0 0 0 1px #4A5568 !important",
              }}
              defaultChecked={false}
              colorScheme={additionaLayerToggleSelected ? "gray" : "gray"}
              onChange={() => {
                onToggleDistrictLayer();
                handleLayerToggleClick();
              }}
            />
            <FormLabel marginBottom={"0"} fontWeight={"normal"}>
              <Box
                display={"grid"}
                gridTemplateColumns={{
                  base: "2fr 1fr",
                  md: "repeat(6, 1fr)",
                }}
                gridGap={".5rem"}
                alignItems={"center"}
              >
                <Box
                  className="cd-text"
                  gridColumn={{
                    base: "initial",
                    md: "span 5",
                  }}
                  width={{
                    base: "initial",
                    md: "18rem",
                  }}
                >
                  Community District (CD)*
                </Box>
                <Box className="cd-square" justifySelf={"end"}>
                  <LayerSelectionSquareCD />
                </Box>
              </Box>
              <FormHelperText fontSize={".8125rem"}>
                *Approximated using data from Public Use Microdata Areas
                (PUMAs).
              </FormHelperText>
            </FormLabel>
          </FormControl>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
