import Head from "next/head";
import { useRouter } from "next/router";

const pages = [
  {
    path: "/about",
    title: "About",
    image:
      "https://equitableexplorer.planning.nyc.gov/edde-logo-for-social.png",
  },
  {
    path: "/methods",
    title: "Methods & Sources",
    image:
      "https://equitableexplorer.planning.nyc.gov/edde-logo-for-social.png",
  },
  {
    path: "/map/data",
    title: "Map",
    image:
      "https://equitableexplorer.planning.nyc.gov/community-data-landing-page.png",
  },
  {
    path: "/map/drm",
    title: "Displacement Risk Map",
    image: "https://equitableexplorer.planning.nyc.gov/drm-landing-page.png",
  },
  {
    path: "/data",
    title: "Data Tables",
    image: "https://equitableexplorer.planning.nyc.gov/data-tables.png",
  },
];

export const PageHeader = () => {
  const path = useRouter().asPath;

  const currentPage = pages.find((page) => path.startsWith(page.path)) || {
    title: "",
    image:
      "https://equitableexplorer.planning.nyc.gov/community-data-landing-page.png",
  };

  return (
    <Head>
      <title>
        {currentPage.title} - NYC Equitable Development Data Explorer
      </title>
      <meta
        name="title"
        content={`${currentPage.title} - NYC Equitable Development Data Explorer`}
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
        content="https://equitableexplorer.planning.nyc.gov/"
        key="og:url"
      />
      <meta
        property="og:title"
        content="NYC Equitable Development Data Explorer"
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
        content="https://equitableexplorer.planning.nyc.gov/"
        key="twitter:url"
      />
      <meta
        property="twitter:title"
        content="NYC Equitable Development Data Explorer"
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
