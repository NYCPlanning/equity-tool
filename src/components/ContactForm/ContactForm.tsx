import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface Inputs {
  name: string;
  email: string;
  feedback: string;
}

Yup.setLocale({
  mixed: {
    default: "This is a required field.",
    required: "This is a required field.",
  },
});

const feedbackSchema = Yup.object({
  name: Yup.string()
    .default("")
    .min(2, "Name must be at least 2 characters.")
    .required("Name must be at least 2 characters."),
  email: Yup.string()
    .default("")
    .email("Please enter a valid email address.")
    .required(),
  feedback: Yup.string()
    .default("")
    .min(12, "Feedback should be at least 12 characters.")
    .required(),
}).required();

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(feedbackSchema),
  });

  function onSubmit(data: Inputs) {
    console.log("data", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={!!errors.name}>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder={"Full Name"}
          {...register("name")}
          boxShadow={"0 0 0 1px rgba(0, 0, 0, .4)"}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.email}>
        <FormLabel pt={".5rem"}>Email Address</FormLabel>
        <Input
          placeholder={"email@example.com"}
          {...register("email")}
          variant={"outline"}
          boxShadow={"0 0 0 1px rgba(0, 0, 0, .4)"}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.feedback}>
        <FormLabel pt={".5rem"}>Message</FormLabel>
        <Textarea
          placeholder={"Your message"}
          {...register("feedback")}
          resize={"none"}
          boxShadow={"0 0 0 1px rgba(0, 0, 0, .4)"}
        />
        <FormErrorMessage>
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
    </form>
  );
};

export default ContactForm;
