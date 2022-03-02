import Head from "next/head";
import { useRouter } from "next/router";

const pages = [
  {
    path: "/about",
    title: "About",
    image: "https://equitytool.planning.nyc.gov/about.png",
  },
  {
    path: "/methods",
    title: "Methods & Sources",
    image: "https://equitytool.planning.nyc.gov/methods.png",
  },
  {
    path: "/map/datatool",
    title: "Map",
    image: "https://equitytool.planning.nyc.gov/screenshot.png",
  },
  {
    path: "/map/dri",
    title: "Displacement Risk Index",
    image: "https://equitytool.planning.nyc.gov/driscreenshot.png",
  },
  {
    path: "/data",
    title: "Data Tables",
    image: "https://equitytool.planning.nyc.gov/datatables.png",
  },
];

export const PageHeader = () => {
  const path = useRouter().asPath;

  const currentPage = pages.find((page) => path.startsWith(page.path)) || {
    title: "",
    image: "https://equitytool.planning.nyc.gov/screenshot.png",
  };

  return (
    <Head>
      <title>{currentPage.title} - NYC Equitable Development Data Tool</title>
      <meta
        name="title"
        content={`${currentPage.title} - NYC Equitable Development Data Tool`}
      />
      <meta
        name="description"
        content="Explore New York City's housing conditions, demographic patterns, and more."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://equitytool.planning.nyc.gov/" />
      <meta property="og:title" content="NYC Equitable Development Data Tool" />
      <meta
        property="og:description"
        content="Explore New York City's housing conditions, demographic patterns, and more."
      />
      <meta property="og:image" content={`${currentPage.image}`} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://equitytool.planning.nyc.gov/"
      />
      <meta
        property="twitter:title"
        content="NYC Equitable Development Data Tool"
      />
      <meta
        property="twitter:description"
        content="Explore New York City's housing conditions, demographic patterns, and more."
      />
      <meta property="twitter:image" content={`${currentPage.image}`} />
    </Head>
  );
};
