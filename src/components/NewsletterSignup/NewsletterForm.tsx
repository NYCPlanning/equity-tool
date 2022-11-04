import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { newsletterSchema, Newsletter } from "@schemas/newsletterSchema";
import { ErrorIcon } from "@components/Icons";

const NewsletterForm = () => {
  const [showNewsletterForm, setShowNewsletterForm] = useState<boolean>(true);
  const [hideErrorMessage, setHideErrorMessage] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Newsletter>({
    resolver: yupResolver(newsletterSchema),
  });

  async function onSubmit(data: Newsletter) {
    const signupBody = {
      email: `${data.email}`,
    };

    try {
      await axios({
        method: "put",
        url: "/api/newsletter",
        data: signupBody,
      }).then(function () {
        setShowNewsletterForm(!showNewsletterForm);
      });
    } catch (error) {
      setHideErrorMessage(!hideErrorMessage);
      throw new Error("form fail");
    }
  }

  return (
    <Flex
      flexDirection={"column"}
      width={{ base: "full", md: "60%", lg: "45%" }}
    >
      <Box>
        <Heading fontSize={"sm"}>GET UPDATES</Heading>
        <Text fontSize={"small"} pt={".5rem"}>
          Join our mailing list to stay informed on updates and future
          engagement activities.
        </Text>
      </Box>
      <Box mt={4}>
        {showNewsletterForm && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>Email Address</FormLabel>
            <Flex flexDirection={"row"} mb={2}>
              <FormControl isInvalid={!!errors.email}>
                <InputGroup>
                  {!!errors.email && (
                    <InputLeftElement pointerEvents="none">
                      <ErrorIcon />
                    </InputLeftElement>
                  )}
                  <Input
                    placeholder={"email@example.com"}
                    {...register("email")}
                    variant={"outline"}
                    backgroundColor={"white"}
                    boxShadow={"0 0 0 1px rgba(0, 0, 0, .4)"}
                    mr={".5rem"}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                width={"7.0625rem"}
                type={"submit"}
                colorScheme={"teal"}
                isLoading={isSubmitting}
                _hover={{
                  background: "#E6FFFA",
                  color: "#2C7A7B",
                }}
              >
                Subscribe
              </Button>
            </Flex>
            {!hideErrorMessage && (
              <Text position={"relative"} top={".5rem"} color={"red.500"}>
                <ErrorIcon />
                &nbsp; There was an error trying to add you to the mailing list.
                Please try again later.
              </Text>
            )}
          </form>
        )}

        {!showNewsletterForm && (
          <Box
            width={"full"}
            maxW={{ base: "565px", lg: "1024px" }}
            height={"full"}
            margin={{ base: "1rem 0 0 0", lg: "0" }}
          >
            <Text fontSize={"1rem"} color={"gray.700"} fontStyle={"italic"}>
              Thank you! We’ve added you to our list.
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default NewsletterForm;
