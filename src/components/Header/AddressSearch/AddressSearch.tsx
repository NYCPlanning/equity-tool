import {
  Combobox,
  MapPinIcon,
  Text,
  VStack,
  UnorderedList,
  ListItem,
  Link,
  Box,
} from "@nycplanning/streetscape";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import type {
  ListCollection,
  UseComboboxReturn,
} from "@nycplanning/streetscape";

export const ADDRESS_SEARCH_RADIUS = {
  DEFAULT: 400,
  MIN: 50,
  MAX: 7920,
};

export const AddressSearch = ({
  combobox,
  addressSearchQuery,
  addressSearchResults,
  addressSearchError,
  isLoading,
}: {
  combobox: UseComboboxReturn;
  addressSearchQuery: string | null;
  addressSearchResults: ListCollection;
  addressSearchError: Error | null;
  isLoading: boolean;
}) => {
  return (
    <Combobox.RootProvider value={combobox}>
      <Combobox.Control>
        <SearchIcon
          color="primary.600"
          h={5}
          w={5}
          position="absolute"
          left="0.375rem"
          pointerEvents="none"
        />

        <Combobox.Input placeholder="Search by Address..." autoComplete="off" />

        <Combobox.ClearTrigger bg="white">
          <CloseIcon w={3} h={3} />
        </Combobox.ClearTrigger>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content
          backgroundColor={"white"}
          display={
            addressSearchQuery !== null && addressSearchQuery.length > 2
              ? "block"
              : "none"
          }
        >
          <Text
            paddingY={2}
            fontSize={"sm"}
            fontWeight={"700"}
            color={"gray.700"}
          >
            Add Map Pin
          </Text>
          {addressSearchResults.items.length > 0 ? (
            addressSearchResults.items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                <MapPinIcon h={4} w={2.5} mr={2} />
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
              </Combobox.Item>
            ))
          ) : isLoading && addressSearchQuery !== null ? (
            <Text fontSize={"sm"}>Loading...</Text>
          ) : (
            <VStack padding={4} gap={3} align={"flex-start"}>
              {addressSearchError ? (
                <>
                  <Text fontSize={"sm"}>Sorry, something went wrong.</Text>
                  <Text fontSize={"sm"}>
                    Need help?{" "}
                    <Link
                      color={"primary.600"}
                      textDecorationLine={"underline"}
                      href="mailto:CAPS@planning.nyc.gov"
                    >
                      E-mail us.
                    </Link>
                  </Text>
                </>
              ) : (
                <>
                  <Text fontSize={"sm"}>Sorry, no results found.</Text>
                  <Box>
                    <Text fontSize={"sm"}>Suggestions:</Text>
                    <UnorderedList>
                      <ListItem fontSize={"sm"}>
                        Check your search for typos.
                      </ListItem>
                      <ListItem fontSize={"sm"}>
                        Need help?{" "}
                        <Link
                          color={"primary.600"}
                          textDecorationLine={"underline"}
                          href="mailto:CAPS@planning.nyc.gov"
                        >
                          E-mail us.
                        </Link>
                      </ListItem>
                    </UnorderedList>
                  </Box>
                </>
              )}
            </VStack>
          )}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.RootProvider>
  );
};
