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
} from "@chakra-ui/react";
import { MapLayersIcon } from "@components/Icons";

export interface AdditionalMapLayersProps {
  onToggleDistrictLayer: () => void;
}

export const AdditionalMapLayers = ({
  onToggleDistrictLayer,
}: AdditionalMapLayersProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box
          className="test-box"
          gridGap={"0.5rem"}
          position={"absolute"}
          top={"6.5rem"}
          zIndex={"9999"}
        >
          <Button
            leftIcon={<MapLayersIcon />}
            minWidth={"auto"}
            padding={"0"}
            width={"1.875rem"}
            height={"1.875rem"}
            boxShadow={"0 0 0 2px rgba(0 0 0 / 10%)"}
            variant={"outline"}
            _hover={{ color: "currentColor" }}
          ></Button>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        position={"absolute"}
        maxWidth={"22.75rem"}
        top={"-2.5rem"}
        left={"-1.7rem"}
        _focus={{
          boxShadow: "0 0 0 3px #e2e8f0",
        }}
      >
        <PopoverHeader
          className="popoverHeaderWrapper"
          display={"flex"}
          flexDirection={"row"}
          gridGap={"1.5rem"}
          alignItems={"center"}
          p={"0"}
          paddingTop={"0.5rem"}
          borderBottom={"none"}
        >
          <Box className="addLayerWapper" visibility={"hidden"} flexGrow={"0"}>
            <MapLayersIcon />
          </Box>
          <Box
            className="addLayerOptions"
            pt={"0.6rem"}
            fontWeight={"bold"}
            flexGrow={"2"}
          >
            Additional Layers
          </Box>
        </PopoverHeader>
        <PopoverBody>
          <FormControl
            className="nta-wrapper"
            display={"flex"}
            alignItems={"center"}
            gridGap={".5rem"}
          >
            <Switch
              className={"nta-switch"}
              colorScheme={"lightgray"}
              _focus={{
                boxShadow: "0 0 0 3px #e2e8f0",
              }}
              defaultChecked={false}
              onChange={() => {
                console.log("nothing to see here yet");
              }}
            />
            <FormLabel mb={"0"} fontWeight={"normal"}>
              Neighborhood Tabulation Area (NTA)
            </FormLabel>
          </FormControl>
          <FormControl
            className="cd-wrapper"
            mt={"10px"}
            display={"flex"}
            alignItems={"top"}
            gridGap={".5rem"}
          >
            <Switch
              className="cd-switch"
              colorScheme={"lightgray"}
              mt={"0.125rem"}
              _focus={{
                boxShadow: "0 0 0 3px #e2e8f0",
              }}
              defaultChecked={false}
              onChange={() => {
                onToggleDistrictLayer();
              }}
            />
            <FormLabel mb={"0"} fontWeight={"normal"}>
              Community District (CD)*
              <FormHelperText fontSize={"0.8125rem"}>
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
