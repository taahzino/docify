import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import classes from "../styles/Dashboard.module.css";
import AlertComponent from "./Alert";
import Gallery from "./Gallery";
import { useXhr } from "../hooks/useXhr";
import { useDocs } from "../contexts/DocsContext";
import Loading from "./Loading";
import Header from "./Header";

const DashboardPage = () => {
    const [shouldGetDocs, setShouldGetDocs] = useState(false);
    const [loading, setLoading] = useState(true);

    const { docs, dispatchDocs } = useDocs();

    const getAllDocs = useXhr(
        shouldGetDocs,
        "get",
        `${process.env.REACT_APP_SERVER_URL}/api/docs/`
    );

    useEffect(() => {
        if (getAllDocs && getAllDocs.type === "success") {
            let payload = getAllDocs.data.docs;
            if (getAllDocs.data.docs.length > 0) {
                dispatchDocs({
                    type: "load",
                    payload,
                });
            }
            setLoading(false);
            setShouldGetDocs(false);
        }

        return () => {
            setLoading(false);
            setShouldGetDocs(false);
        };
    }, [getAllDocs]);

    useEffect(() => {
        if (docs && docs.length > 0) {
            setLoading(false);
        }
        if (!docs || docs.length < 1) {
            setLoading(true);
            setShouldGetDocs(true);
        }

        return () => {
            setShouldGetDocs(false);
        };
    }, []);

    return (
        <>
            <Container
                fluid
                className="rounded d-flex align-items-center justify-content-center"
            >
                <Container
                    className={`text-light rounded p-2 ${classes.dashboard}`}
                >
                    <Header />
                    <AlertComponent
                        variant="secondary"
                        show={!loading && docs && docs.length < 1}
                    >
                        No document uploaded yet
                    </AlertComponent>

                    <Loading loading={loading} text="Getting your docs" />

                    <Gallery docs={docs} />
                </Container>
            </Container>
        </>
    );
};

export default DashboardPage;
