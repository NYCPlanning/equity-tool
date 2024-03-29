import React, { useEffect } from "react";
import { Flex, Box, Center, Heading, Text } from "@chakra-ui/react";
import GetInTouch from "@components/GetInTouch/GetInTouch";
import NewsletterFooter from "@components/Footers/NewsletterFooter";
import ContactForm from "@components/Contact/ContactForm";

const ContactPage = () => {
  useEffect(() => {
    const backToTop = document.getElementById("back-to-top");
    if (backToTop != null) {
      backToTop.scrollTop = 0;
    }
  }, []);

  return (
    <Flex direction="column" width="100%">
      <Center px={{ base: 4, lg: 6 }} py={8} bg="teal">
        <Flex
          direction="row"
          maxW={{ base: "565px", lg: "1024px" }}
          wrap="wrap"
          color="white"
          gridGap={{ base: 0, md: 20, lg: 20 }}
        >
          <Box flex={{ base: "auto", md: 2, xl: 2 }} bg={"1px solid white"}>
            <Heading size="lg" fontSize="2.375rem" pb="0.5em">
              Contact
            </Heading>
            <Text fontSize="1.5625rem" lineHeight="2.1875rem">
              The Equitable Development Data Explorer was created by the NYC
              Departments of City Planning (DCP) and Housing Preservation and
              Development (HPD) to equip New Yorkers with data to inform public
              discussions about racial equity and planning for a fairer city. We
              want your feedback on how to make it better.
            </Text>
          </Box>
          <GetInTouch
            flex={1}
            py={10}
            pt={{ base: 0 }}
            fontSize="1rem"
            display={"block"}
          />
        </Flex>
      </Center>

      <Center
        py={{ base: "2.5rem", xl: "5rem" }}
        px={{ base: "1rem", lg: "1.5rem" }}
      >
        <Flex
          direction="row"
          width={"40rem"}
          maxW={{ base: "565px", lg: "1024px" }}
        >
          <Box flex={{ base: "auto", md: 2, xl: 2 }}>
            <Heading size="lg" pb="0.5em" fontSize="2.125rem">
              Send us your feedback
            </Heading>
            <Text pb="0.5em" fontSize="sm">
              Please use the form below to send us your comments.
            </Text>
            <ContactForm />
          </Box>
        </Flex>
      </Center>

      <NewsletterFooter />
    </Flex>
  );
};

export default ContactPage;
