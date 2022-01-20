import { Box } from "@chakra-ui/react";

const Sidebar = () => {
  return <Box flex="1" height="100%" bg="teal.50"></Box>;
};

const DataPage = () => {
  return (
    <>
      <Sidebar />

      <Box flex="3">Tables</Box>
    </>
  );
};

export default DataPage;
