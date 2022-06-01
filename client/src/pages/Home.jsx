import React, { useState, useEffect } from "react";
import AlertComponent from "../components/Alert";
import Gallery from "../components/Gallery";
import { useDocs } from "../contexts/DocsContext";
import Loading from "../components/Loading";
import PageTitle from "../components/PageTitle";
import Layout from "../components/layout/Layout";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const { docs, docsLoaded } = useDocs();

  useEffect(() => {
    if (docsLoaded) {
      setLoading(false);
    }

    return () => {};
  }, [docsLoaded]);

  return (
    <Layout>
      <PageTitle>Home</PageTitle>
      <AlertComponent
        variant="secondary"
        show={!loading && docs && docs.length < 1}
      >
        No document uploaded yet
      </AlertComponent>

      <Loading loading={loading} text="Getting your docs" />

      <Gallery docs={docs} loading={loading} />
    </Layout>
  );
};

export default Home;
