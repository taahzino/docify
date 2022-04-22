import React, { useState, useEffect } from "react";
import AlertComponent from "../components/Alert";
import Gallery from "../components/Gallery";
import { useDocs } from "../contexts/DocsContext";
import Loading from "../components/Loading";

const Home = () => {
    const [loading, setLoading] = useState(true);

    const { docs } = useDocs();

    useEffect(() => {
        if (docs && docs.length > 0) {
            setLoading(false);
        }
        if (!docs) {
            setLoading(true);
        }

        return () => {};
    }, [docs]);

    return (
        <>
            <h2>Home</h2>
            <AlertComponent
                variant="secondary"
                show={!loading && docs && docs.length < 1}
            >
                No document uploaded yet
            </AlertComponent>

            <Loading loading={loading} text="Getting your docs" />

            <Gallery docs={docs} />
        </>
    );
};

export default Home;
