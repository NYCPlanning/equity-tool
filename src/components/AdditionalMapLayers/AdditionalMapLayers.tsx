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
import { View } from "@constants/View";
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

  return (
    <Popover>
      <PopoverTrigger>
        <Box
          gridGap={"0.5rem"}
          position={"absolute"}
          top={{
            base: view === View.DATA ? "10rem" : "6.75rem",
            md: view === View.DATA ? "14.5rem" : "11rem",
          }}
          left={{
            base: "1.5rem",
            md: view === View.DATA ? "1rem" : "1rem",
          }}
          zIndex={10}
        >
          <Button
            leftIcon={<MapLayersIcon />}
            minWidth={"auto"}
            padding={"0"}
            width={"1.875rem"}
            height={"1.875rem"}
            maxHeight="30px"
            boxShadow={"0 0 0 1px rgba(0, 0, 0, .2)"}
            variant={"outline"}
            position={{
              base: "relative",
              md: "initial",
            }}
            _hover={{ color: "currentColor" }}
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
            leftIcon={<MapLayersIcon />}
            minWidth={"auto"}
            padding={"0"}
            backgroundColor={"white"}
            flexGrow={"0"}
            width={"1.875rem"}
            height={"1.875rem"}
            maxHeight="30px"
            variant={"outline"}
            _hover={{ color: "currentColor" }}
          ></Button>
          <Text flexGrow={"2"}>Additional Layers</Text>
        </PopoverHeader>
        <PopoverBody>
          <FormControl
            display={"flex"}
            alignItems={"center"}
            gridGap={".5rem"}
            left={{
              base: "-.5rem",
              md: "initial",
            }}
          >
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
                <Box justifySelf={"end"}>
                  <LayerSelectionSquareNTA />
                </Box>
              </Box>
            </FormLabel>
          </FormControl>
          <FormControl
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
                <Box justifySelf={"end"}>
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
