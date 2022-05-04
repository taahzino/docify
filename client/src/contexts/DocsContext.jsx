import React, { useContext, useReducer, useState, useEffect } from "react";
import { useXhr } from "../hooks/useXhr";
import { useAuth } from "./AuthContext";

const DocsContext = React.createContext();

export const useDocs = () => {
    return useContext(DocsContext);
};

const initialDocs = [];

const reducer = (state, action) => {
    switch (action.type) {
        case "load":
            return [...state, ...action.payload];
        case "create":
            return [action.doc, ...state];
        case "update":
            return [
                action.payload,
                ...state.filter(
                    (doc) =>
                        doc._id.toString() !== action.payload._id.toString()
                ),
            ];
        case "delete":
            return state.filter(
                (doc) => doc._id.toString() !== action.docId.toString()
            );
        case "deleteSome":
            const newState = [];
            for (let i = 0; i < action.keep; i++) {
                newState.push(state[i]);
            }
            return newState;
        case "unload":
            return [];
        default:
            return state;
    }
};

export const DocsProvider = ({ children }) => {
    const [docs, dispatchDocs] = useReducer(reducer, initialDocs);
    const [shouldGetDocs, setShouldGetDocs] = useState(false);

    const [pageNumber, setPageNumber] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const limit = 8;

    const { currentUser } = useAuth();

    const getAllDocs = useXhr(
        shouldGetDocs,
        "get",
        `${process.env.REACT_APP_SERVER_URL}/api/docs/limit/${
            pageNumber * limit
        }/${limit}`
    );

    const deleteSome = () => {
        dispatchDocs({
            type: "deleteSome",
            keep: 8,
        });
        setPageNumber(1);
        setHasMore(true);
    };

    useEffect(() => {
        if (getAllDocs && getAllDocs.type === "success") {
            setPageNumber((state) => state + 1);
            let payload = getAllDocs.data.docs;
            if (getAllDocs.data.docs.length > 0) {
                dispatchDocs({
                    type: "load",
                    payload,
                });
            }
            if (getAllDocs.data.docs.length < limit) {
                setHasMore(false);
            }
            setShouldGetDocs(false);
        }

        return () => {
            setShouldGetDocs(false);
        };
    }, [getAllDocs]);

    useEffect(() => {
        if (currentUser && currentUser._id && currentUser.email) {
            setShouldGetDocs(true);
        }
    }, [currentUser]);

    const value = {
        docs,
        dispatchDocs,
        setPageNumber,
        hasMore,
        setHasMore,
        setShouldGetDocs,
        deleteSome,
    };
    return (
        <DocsContext.Provider value={value}>{children}</DocsContext.Provider>
    );
};
