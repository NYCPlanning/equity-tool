import { useRef } from "react";
import {
  Box,
  BoxProps,
  IconButtonProps,
  Heading,
  Flex,
  IconButton,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";

interface IconPanelProps
  extends Omit<BoxProps, "onClick" | "aria-label">,
    Pick<IconButtonProps, "icon" | "aria-label" | "onClick"> {
  heading: string;
}

export const IconPanel = ({
  icon,
  "aria-label": ariaLabel,
  heading,
  onClick,
  children,
  height,
  width,
  ...boxProps
}: IconPanelProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isOpen, onToggle, onClose } = useDisclosure();
  useOutsideClick({
    ref,
    handler: () => {
      isOpen && onClose();
    },
  });
  return (
    <Box
      position="absolute"
      left={{
        base: isOpen ? "0.875rem" : "1.5rem",
        md: isOpen ? "0.375rem" : "1rem",
      }}
      backgroundColor="#FFFFFF"
      borderRadius="8px"
      boxShadow={"0 0 0 1px rgba(0, 0, 0, .2)"}
      maxWidth={{ base: "unset", md: "364px" }}
      width={isOpen ? width : "2rem"}
      height={isOpen ? height : "2rem"}
      transitionProperty={
        "padding-top, padding-bottom, transform, width, height, left"
      }
      transitionTimingFunction={"easy"}
      transitionDuration={"0.25s"}
      transitionDelay={isOpen ? "0s" : "0.25s"}
      overflow={"hidden"}
      paddingY={isOpen ? "0.625rem" : "0rem"}
      transform={`translateY(${isOpen ? "-0.625rem" : "0rem"})`}
      ref={ref}
      {...boxProps}
    >
      <Flex
        direction={"row"}
        align="center"
        width={width}
        marginBottom={"0.75rem"}
        paddingX={isOpen ? "0.625rem" : "0rem"}
        transition={
          isOpen
            ? "padding 0.25s ease, opacity 0.25s ease 0.25s"
            : "padding 0.25s ease 0.25s, opacity 0.25s ease"
        }
      >
        <IconButton
          onClick={onToggle}
          aria-label={ariaLabel}
          fontSize={"1.125rem"}
          icon={icon}
          minWidth={"auto"}
          padding={"0"}
          width={"2rem"}
          height={"2rem"}
          variant={"outline"}
          position={{
            base: "relative",
            md: "initial",
          }}
          _hover={{ color: "currentColor" }}
        />

        <Heading
          marginLeft={"0.75rem"}
          flexGrow={"2"}
          as="h2"
          fontWeight={"bold"}
          fontSize={"1.25rem"}
          color={"gray.700"}
          opacity={isOpen ? "1" : "0"}
          transition={
            isOpen ? "opacity 0.25s ease 0.25s" : "opacity 0.25s ease"
          }
        >
          {heading}
        </Heading>
      </Flex>
      <Box
        width={width}
        paddingX={isOpen ? "0.625rem" : "0rem"}
        opacity={isOpen ? "1" : "0"}
        transition={
          isOpen
            ? "padding 0.25s ease, opacity 0.25s ease 0.25s"
            : "padding 0.25s ease 0.25s, opacity 0.25s ease"
        }
      >
        {children}
      </Box>
    </Box>
  );
};
