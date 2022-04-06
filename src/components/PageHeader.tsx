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
    path: "/map/data",
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
        key="title"
      />
      <meta
        name="description"
        content="Explore New York City's housing conditions, demographic patterns, and more."
        key="description"
      />

      <meta property="og:type" content="website" key="og:type" />
      <meta
        property="og:url"
        content="https://equitytool.planning.nyc.gov/"
        key="og:url"
      />
      <meta
        property="og:title"
        content="NYC Equitable Development Data Tool"
        key="og:title"
      />
      <meta
        property="og:description"
        content="Explore New York City's housing conditions, demographic patterns, and more."
        key="og:description"
      />
      <meta
        property="og:image"
        content={`${currentPage.image}`}
        key="og:image"
      />

      <meta
        property="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta
        property="twitter:url"
        content="https://equitytool.planning.nyc.gov/"
        key="twitter:url"
      />
      <meta
        property="twitter:title"
        content="NYC Equitable Development Data Tool"
        key="twitter:title"
      />
      <meta
        property="twitter:description"
        content="Explore New York City's housing conditions, demographic patterns, and more."
        key="twitter:description"
      />
      <meta
        property="twitter:image"
        content={`${currentPage.image}`}
        key="twitter:image"
      />
    </Head>
  );
};
