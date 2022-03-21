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

export interface DataDownloadModalProps {
  downloadType: string; // "datatool" | "dri";
  geoid: string | null;
}

export const DataDownloadModal = ({
  downloadType,
  geoid,
}: DataDownloadModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formSubmitDisabled, setFormSubmitDisabled] = useState(true);
  const [filetype, setFiletype] = useState("");
  const updateFiletype = (ft: string) => {
    console.log(downloadType, "to pass linting");
    setFiletype(ft);
    setFormSubmitDisabled(false);
  };

  const submit = () => {
    if (!formSubmitDisabled) {
      onClose();
    }
  };
  const pumaInfo = usePumaInfo(geoid);
  const geolabel = `PUMA ${pumaInfo?.id}: ${
    pumaInfo?.neighborhoods
  }, ${pumaInfo?.districts.slice(
    8,
    pumaInfo?.districts.indexOf(" CD")
  )}, Citywide`;

  return (
    <>
      <Button variant="download" colorScheme="teal" onClick={onOpen}>
        <Text display={{ base: "none", md: "inherit" }}>
          Download Data&nbsp;
        </Text>
        <FaDownload />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader p="1rem 1rem 1rem 1rem">
            <Text fontWeight={700} fontSize="1.25rem">
              Data Download Summary
            </Text>
          </ModalHeader>
          <Divider color={"gray.200"} />

          <ModalBody p="0rem 1rem">
            <Heading
              fontSize="0.8125rem"
              color="#2C7A7B"
              fontWeight={700}
              pb="0.5rem"
            >
              GEOGRAPHY
            </Heading>
            <Text pb="1rem">{geolabel}</Text>
            <Heading
              fontSize="0.8125rem"
              color="#2C7A7B"
              fontWeight={700}
              pb="0.5rem"
            >
              CATEGORIES
            </Heading>
            <Text pb="1rem">All</Text>
            <Heading
              fontSize="0.8125rem"
              color="#2C7A7B"
              fontWeight={700}
              pb="0.5rem"
            >
              REPORT TYPE
            </Heading>
          </ModalBody>

          <form>
            <FormControl isRequired p="0rem 1rem 2.5rem">
              <RadioGroup onChange={updateFiletype} value={filetype}>
                <Stack direction="column">
                  <Radio value="pdf">Community Profile (.pdf)</Radio>
                  <Radio value="xls">Data set (.xls)</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <ModalFooter w="100%" p="0">
              <Button
                w="100%"
                h="100%"
                p="1rem 0rem"
                borderTopRadius={0}
                onClick={submit}
                variant="download"
                colorScheme="teal"
                isDisabled={formSubmitDisabled}
              >
                <FaDownload /> &nbsp;Download data
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
