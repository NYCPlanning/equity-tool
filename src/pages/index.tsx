export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/nta",
      permanent: false,
    },
  };
}

const Index = () => <></>;

export default Index;
