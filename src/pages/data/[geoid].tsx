import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

export interface DataPageProps {
  initialRouteParams: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      props: {
        initialRouteParams: "",
      },
    };
  }
  const { subroutes } = context.params;

  if (typeof subroutes === "string") {
    return {
      props: {
        initialRouteParams: "",
      },
    };
  }

  return {
    props: {
      initialRouteParams: subroutes ? subroutes.join(",") : "",
    },
  };
};

const Sidebar = () => {
  const router = useRouter();

  const { geoid } = router.query;

  return (
    <Box flex="1" height="100%" bg="teal.50">
      Viewing data for Geography {geoid}
    </Box>
  );
};

const DataPage = ({ initialRouteParams }: DataPageProps) => {
  console.log(initialRouteParams); // TODO: Remove this contrived usage of initialRouteParams

  return (
    <>
      <Sidebar />

      <Box flex="3">Tables</Box>
    </>
  );
};

export default DataPage;
