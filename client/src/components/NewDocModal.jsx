import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import AlertComponent from "./Alert";
import axios from "axios";

const NewDocModal = ({ show, handleClose: hideModal }) => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState();
    const [shouldRequest, setShouldRequest] = useState(false);

    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { Authorization } = useAuth();

    const handleClose = () => {
        setTitle("");
        setFile(null);
        hideModal();
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setShouldRequest(false);
        setShowError(false);
        setErrorMessage("");

        if (!title || !file) {
            setShowError(true);
            setErrorMessage("Please give a title and select a file");
        } else {
            setShouldRequest(true);
        }
    };

    useEffect(() => {
        (async () => {
            if (shouldRequest) {
                const formData = new FormData();
                formData.append("title", title);
                formData.append("document", file);

                axios
                    .post("http://localhost:4000/api/docs", formData, {
                        headers: {
                            Authorization,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then(function (response) {
                        console.log(response);
                        setShowSuccess(true);
                        setSuccessMessage(response.data.message);
                        setTitle("");
                        setFile(null);
                        setTimeout(() => {
                            setShowSuccess(false);
                            setSuccessMessage(null);
                            handleClose();
                        }, 1000);
                    })
                    .catch(function (error) {
                        console.log(error.response);
                        setShowError(true);
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
        <Modal show={show} onHide={handleClose} onSubmit={submitHandler}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>Add new document</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <AlertComponent variant="danger" show={showError}>
                        {errorMessage}
                    </AlertComponent>

                    <AlertComponent variant="success" show={showSuccess}>
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
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewDocModal;
