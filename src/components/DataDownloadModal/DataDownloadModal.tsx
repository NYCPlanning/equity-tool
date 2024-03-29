import { useState } from "react";
import {
  Heading,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  Divider,
  Text,
  Button,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";
import { usePumaInfo } from "@hooks/usePumaInfo";
import { Geography } from "@constants/geography";
import { getBoroughAbbreviation } from "@helpers/getBoroughAbbreviation";
import { getBoroughName } from "@helpers/getBoroughName";
import ReactGA from "react-ga4";
import { View } from "@constants/View";

export interface DataDownloadModalProps {
  downloadType: View.DATA | View.DRM | null;
  geoid: string | null;
  geography: Geography | null;
}

export const DataDownloadModal = ({
  downloadType,
  geoid,
  geography,
}: DataDownloadModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formSubmitDisabled, setFormSubmitDisabled] = useState(true);
  const [filetype, setFiletype] = useState("");
  const updateFiletype = (ft: string) => {
    setFiletype(ft);
    setFormSubmitDisabled(false);
  };

  const baseUrl = "https://equity-tool-data.nyc3.digitaloceanspaces.com";
  const pumaInfo = usePumaInfo();

  const getUrl = () => {
    if (downloadType === View.DRM) {
      return `${baseUrl}/DRI_Subindices_Indicators.xls`;
    }

    if (geoid === null) {
      return "#";
    }

    const typeString = filetype === "xls" ? "xlsx" : "pdf";

    if (geography === Geography.CITYWIDE) {
      return `${baseUrl}/downloads/citywide_${typeString}.zip`;
    }

    if (geography === Geography.BOROUGH) {
      return `${baseUrl}/downloads/${getBoroughAbbreviation(
        geoid
      )}_${typeString}.zip`;
    }

    return `${baseUrl}/downloads/${geoid}_${typeString}.zip`;
  };

  const getLabel = () => {
    if (downloadType === View.DRM) {
      return "Neighborhood Tabulation Areas: All";
    }

    if (geography === Geography.DISTRICT) {
      return `PUMA ${pumaInfo?.id}: ${
        pumaInfo?.neighborhoods
      }, ${pumaInfo?.districts.slice(
        8,
        pumaInfo?.districts.indexOf(" CD")
      )}, Citywide`;
    }

    if (geography === Geography.BOROUGH) {
      return `${getBoroughName(geoid === null ? "" : geoid)}, Citywide`;
    }

    return "Citywide";
  };

  const submit = () => {
    if (downloadType === View.DRM) {
      ReactGA.event({
        category: "Download XLS",
        action: "Click",
        label: "Displacement Risk Map",
      });
      return onClose();
    }
    if (!formSubmitDisabled && downloadType === View.DATA) {
      ReactGA.event({
        category: `Download ${filetype.toUpperCase()}`,
        action: "Click",
        label: `${geoid}`,
      });
      return onClose();
    }
  };

  const openDownloadModal = () => {
    ReactGA.event({
      category: "Download Modal",
      action: "Click",
      label: "Open",
    });
    onOpen();
  };

  const closeDownloadModal = () => {
    ReactGA.event({
      category: "Download Modal",
      action: "Click",
      label: "Close",
    });
    onClose();
  };

  return (
    <>
      <Button variant="download" colorScheme="teal" onClick={openDownloadModal}>
        <FaDownload />
        <Text display={{ base: "none", md: "flex" }}>&nbsp;Download data</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={closeDownloadModal} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader p="1rem 1rem 1rem 1rem">
            <Text fontWeight={700} fontSize="1.25rem">
              Data Download
            </Text>
          </ModalHeader>
          <Divider color={"gray.200"} />

          <ModalBody p="1rem 1rem 2.5rem">
            <Heading
              fontSize="0.8125rem"
              color="teal.600"
              fontWeight={700}
              pb="0.5rem"
            >
              GEOGRAPHY
            </Heading>
            <Text pb="1rem">{getLabel()}</Text>
            <Heading
              fontSize="0.8125rem"
              color="teal.600"
              fontWeight={700}
              pb="0.5rem"
            >
              CATEGORIES
            </Heading>
            <Text pb="1rem">All</Text>
            <Heading
              fontSize="0.8125rem"
              color="teal.600"
              fontWeight={700}
              pb="0.5rem"
            >
              REPORT TYPE
            </Heading>
            {downloadType === View.DRM ? (
              <Text>Data set (.xls)</Text>
            ) : (
              <FormControl isRequired p="0rem">
                <RadioGroup onChange={updateFiletype} value={filetype}>
                  <Stack direction="column">
                    {geography === Geography.DISTRICT ? (
                      <Radio value="pdf">Community Profile (.pdf)</Radio>
                    ) : (
                      <Radio isDisabled={true} value="pdf">
                        Community Profile (.pdf) (only avaialable on district
                        level)
                      </Radio>
                    )}
                    <Radio value="xls">Data set (.xls)</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter w="100%" p="0">
            <Link
              _hover={{ textDecoration: "none" }}
              textDecoration="none"
              href={getUrl()}
              isExternal={true}
              w="100%"
            >
              <Button
                width="100%"
                height="100%"
                padding="1rem 0rem"
                borderTopRadius={0}
                fontSize={"1.5rem"}
                onClick={submit}
                variant="download"
                colorScheme="teal"
                isDisabled={
                  downloadType === View.DRM ? false : formSubmitDisabled
                }
              >
                <FaDownload /> &nbsp;Download data
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
