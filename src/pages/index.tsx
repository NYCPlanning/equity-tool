export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/map",
      permanent: true,
    },
  };
}

const Index = () => <></>;

export default Index;
