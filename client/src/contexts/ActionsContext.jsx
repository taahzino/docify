import React, { useContext, useState, useEffect } from "react";
import EditDocModal from "../components/EditDocModal";
import DeleteDocModal from "../components/DeleteDocModal";
import MailDocModal from "../components/MailDocModal";
import NewDocModal from "../components/NewDocModal";

const ActionsContext = React.createContext();

export const useActions = () => {
    return useContext(ActionsContext);
};

export const ActionsProvider = ({ children }) => {
    const [selectedDoc, setSelectedDoc] = useState({ title: "", _id: "" });
    const [docAction, setDocAction] = useState("");

    const [showNewDocModal, setShowNewDocModal] = useState(false);
    const [showDeleteDocModal, setShowDeleteDocModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showMailModal, setShowMailModal] = useState(false);

    useEffect(() => {
        switch (docAction.type) {
            case "add":
                setShowNewDocModal(true);
                break;
            case "edit":
                setShowEditModal(true);
                setSelectedDoc(docAction.doc);
                break;
            case "mail":
                setShowMailModal(true);
                setSelectedDoc(docAction.doc);
                break;
            case "delete":
                setShowDeleteDocModal(true);
                setSelectedDoc(docAction.doc);
                break;

            default:
                setSelectedDoc({ title: "", _id: "" });
                break;
        }

        return () => {
            setSelectedDoc({ title: "", _id: "" });
        };
    }, [docAction]);

    const value = {
        selectedDoc,
        setSelectedDoc,
        docAction,
        setDocAction,
        setShowNewDocModal,
    };
    return (
        <ActionsContext.Provider value={value}>
            {children}
            <NewDocModal
                show={showNewDocModal}
                handleClose={() => {
                    setShowNewDocModal(false);
                }}
            />
            <EditDocModal
                show={showEditModal}
                doc={selectedDoc}
                handleClose={() => {
                    setShowEditModal(false);
                }}
            />
            <MailDocModal
                show={showMailModal}
                doc={selectedDoc}
                handleClose={() => {
                    setShowMailModal(false);
                }}
            />
            <DeleteDocModal
                show={showDeleteDocModal}
                doc={selectedDoc}
                handleClose={() => {
                    setShowDeleteDocModal(false);
                }}
            />
        </ActionsContext.Provider>
    );
};
