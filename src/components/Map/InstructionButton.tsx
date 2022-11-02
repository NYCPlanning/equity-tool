import {
  Box,
  HStack,
  Text,
  Square,
  Link,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useView } from "@hooks/useView";
import { View } from "@constants/View";

export const InstructionButton = () => {
  const view = useView();

  return (
    <Popover>
      <PopoverTrigger>
        <Box
          position="absolute"
          top={view === View.DATA ? "7.75rem" : "4.5rem"}
          left={"1.5rem"}
          zIndex={100}
          backgroundColor="#FFFFFF"
          borderRadius="8px"
          stroke="1px #4A5568"
        >
          <Button
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
          >
            <InfoIcon />
          </Button>
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
        zIndex={10}
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
            leftIcon={<InfoIcon />}
            minWidth={"auto"}
            padding={0}
            backgroundColor={"white"}
            flexGrow={"0"}
            width={"1.875rem"}
            height={"1.875rem"}
            maxHeight="30px"
            variant={"outline"}
            _hover={{ color: "currentColor" }}
          ></Button>
          <Text flexGrow={"2"}>Instructions</Text>
        </PopoverHeader>
        <PopoverBody>
          <Text fontSize="1rem" lineHeight="26px" fontWeight={400}>
            {view === View.DATA
              ? "Make a selection on the map by community district*, borough, or city to explore how demographic, housing, and quality of life characteristics compare across neighborhoods and demographic groups over the past two decades."
              : "This Displacement Risk Map illustrates the level of risk residents face of being unable to remain in their homes or neighborhoods."}
          </Text>

          {view === View.DRM && (
            <Text
              fontSize="16px"
              lineHeight="26px"
              fontWeight={400}
              paddingTop=".5rem"
            >
              Select a neighborhood to see a breakdown of the factors
              contributing to displacement risk (population vulnerability,
              housing conditions, and market pressure) and the data points that
              comprise them. See maps of each of the individual data points{" "}
              <Link
                fontWeight={700}
                color="000"
                href="https://storymaps.arcgis.com/stories/79237333bb90492ba0de486c0705f9f7"
                target="blank"
              >
                here
              </Link>
              .
            </Text>
          )}

          <Text
            fontSize="13px"
            lineHeight="20.8px"
            fontWeight={400}
            padding=".5rem 0 .5rem 0"
          >
            {view === View.DATA
              ? "*Community Districts are approximated using data from Public Use Microdata Areas (PUMAs). "
              : "*Approximations of NYC neighborhoods based off of Neighborhood Tabulation Areas (NTAs)."}
          </Text>

          {view === View.DRM && (
            <Box>
              <Text fontWeight={700} paddingBottom=".25rem">
                Legend
              </Text>
              <HStack direction="row" alignItems="center" spacing="8px">
                <Square size="16px" bg="#772F7A" borderRadius="4px" />
                <Text fontSize="16px" color="#4A5568" fontWeight={400}>
                  Highest
                </Text>
              </HStack>
              <HStack direction="row" alignItems="center" spacing="8px">
                <Square size="16px" bg="#BD2E89" borderRadius="4px" />
                <Text fontSize="16px" color="#4A5568" fontWeight={400}>
                  Higher
                </Text>
              </HStack>
              <HStack direction="row" alignItems="center" spacing="8px">
                <Square size="16px" bg="#ED6CA0" borderRadius="4px" />
                <Text fontSize="16px" color="#4A5568" fontWeight={400}>
                  Intermediate
                </Text>
              </HStack>
              <HStack direction="row" alignItems="center" spacing="8px">
                <Square size="16px" bg="#F5B6BC" borderRadius="4px" />
                <Text fontSize="16px" color="#4A5568" fontWeight={400}>
                  Lower
                </Text>
              </HStack>
              <HStack direction="row" alignItems="center" spacing="8px">
                <Square size="16px" bg="#FEEFE5" borderRadius="4px" />
                <Text fontSize="16px" color="#4A5568" fontWeight={400}>
                  Lowest
                </Text>
              </HStack>
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
