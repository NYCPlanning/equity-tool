export async function getStaticProps() {
  return {
    redirect: {
      destination: "/nta",
      permanent: false,
    },
  };
}

const Index = () => <></>;

export default Index;
