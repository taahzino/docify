import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import AlertComponent from "./Alert";
import axios from "axios";
import { useDocs } from "../contexts/DocsContext";

const NewDocModal = ({ show, handleClose: hideModal }) => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState();
    const [shouldRequest, setShouldRequest] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { Authorization } = useAuth();

    const { dispatchDocs } = useDocs();

    const handleClose = () => {
        setTitle("");
        setFile(null);
        hideModal();
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setShouldRequest(false);
        setErrorMessage("");

        if (!title || !file) {
            return setErrorMessage("Please give a title and select a file");
        }
        setShouldRequest(true);
    };

    useEffect(() => {
        (async () => {
            if (shouldRequest) {
                const formData = new FormData();
                formData.append("title", title);
                formData.append("document", file);

                axios
                    .post(
                        `${process.env.REACT_APP_SERVER_URL}/api/docs`,
                        formData,
                        {
                            headers: {
                                Authorization,
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    )
                    .then(function (response) {
                        setSuccessMessage(response.data.message);
                        setTitle("");
                        setFile(null);
                        setTimeout(() => {
                            setSuccessMessage(null);
                            handleClose();
                            dispatchDocs({
                                type: "create",
                                doc: response.data.doc,
                            });
                        }, 300);
                    })
                    .catch(function (error) {
                        setErrorMessage(error.response.data.message);
                        if (error.response.status === 401) {
                            window.location.href = "/";
                        }
                    });
            }
        })();

        return () => {
            setShouldRequest(false);
        };
    }, [shouldRequest]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>Add new document</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler}>
                    <AlertComponent variant="danger" show={errorMessage}>
                        {errorMessage}
                    </AlertComponent>

                    <AlertComponent variant="success" show={successMessage}>
                        {successMessage}
                    </AlertComponent>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Document Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: Passport, NID..."
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Select File</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                            }}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Upload
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewDocModal;
