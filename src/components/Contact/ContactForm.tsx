import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputLeftElement,
  InputGroup,
  Textarea,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { feedbackSchema, Feedback } from "@schemas/feedbackSchema";
import { ErrorIcon } from "@components/Icons";

const ContactForm = () => {
  const [showContactForm, setShowContactForm] = useState<boolean>(true);
  const [hideErrorMessage, setHideErrorMessage] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Feedback>({
    resolver: yupResolver(feedbackSchema),
  });

  const feedback = watch("feedback");
  const feedbackLength = typeof feedback === "undefined" ? 0 : feedback.length;

  async function onSubmit(data: Feedback) {
    const feedbackBody = {
      name: `${data.name}`,
      email: `${data.email}`,
      feedback: `${data.feedback}`,
    };

    try {
      await axios({
        method: "post",
        url: "/api/feedback",
        data: feedbackBody,
      }).then(function () {
        setShowContactForm(!showContactForm);
      });
    } catch (error) {
      setHideErrorMessage(!hideErrorMessage);
    }
  }

  return (
    <Box>
      {showContactForm && (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <InputGroup>
                {!!errors.name && (
                  <InputLeftElement pointerEvents="none">
                    <ErrorIcon />
                  </InputLeftElement>
                )}
                <Input
                  placeholder={"Full Name"}
                  {...register("name")}
                  boxShadow={"0 0 0 1px rgba(0, 0, 0, .4)"}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel pt={".5rem"}>Email Address</FormLabel>
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
                  boxShadow={"0 0 0 1px rgba(0, 0, 0, .4)"}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.feedback}>
              <FormLabel pt={".5rem"}>Message</FormLabel>
              <InputGroup>
                {!!errors.feedback && (
                  <InputLeftElement pointerEvents="none">
                    <ErrorIcon />
                  </InputLeftElement>
                )}
                <Textarea
                  placeholder={"Your message"}
                  {...register("feedback")}
                  resize={"none"}
                  boxShadow={"0 0 0 1px rgba(0, 0, 0, .4)"}
                  paddingLeft={errors.feedback ? "2.5rem" : ""}
                />
              </InputGroup>
              <Text fontSize={"xs"} textAlign={"right"}>
                {feedbackLength}/750
              </Text>
              <FormErrorMessage position={"relative"} top={"-1rem"}>
                {errors.feedback && errors.feedback.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={4}
              width={"7.0625rem"}
              type={"submit"}
              colorScheme={"teal"}
              isLoading={isSubmitting}
              _hover={{
                background: "#E6FFFA",
                color: "#2C7A7B",
              }}
            >
              Send
            </Button>
            {!hideErrorMessage && (
              <Text position={"relative"} top={"1.3125rem"} color={"red.500"}>
                <ErrorIcon />
                &nbsp; There was an error trying to send your message. Please
                try again later.
              </Text>
            )}
          </form>
        </Box>
      )}

      {!showContactForm && (
        <Box
          width={"full"}
          maxW={{ base: "565px", lg: "1024px" }}
          height={"full"}
          margin={{ base: "4rem 0 0 0", lg: "4rem 0 8rem 0" }}
        >
          <Text fontSize={"1rem"} color={"gray.700"} fontStyle={"italic"}>
            Thank you! We appreciate your feedback.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ContactForm;
