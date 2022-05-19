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
            let iterate =
                action.keep <= state.length ? action.keep : state.length;
            for (let i = 0; i < iterate; i++) {
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
    const [docsLoaded, setDocsLoaded] = useState(false);

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

    const removeDocs = () => {
        dispatchDocs({
            type: "unload",
        });
        setPageNumber(0);
        setShouldGetDocs(false);
    };

    const getInitialDocs = () => {
        setPageNumber(0);
        setShouldGetDocs(true);
    };

    const deleteSome = () => {
        dispatchDocs({
            type: "deleteSome",
            keep: limit,
        });
        setPageNumber(1);
        setHasMore(docs.length >= limit ? true : false);
    };

    useEffect(() => {
        if (getAllDocs && getAllDocs.type === "success") {
            setDocsLoaded(true);
            setPageNumber((state) => state + 1);
            let payload = getAllDocs.data.docs;
            if (getAllDocs.data.docs.length > 0) {
                dispatchDocs({
                    type: "load",
                    payload,
                });
            }
            setHasMore(payload.length >= limit ? true : false);
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
        docsLoaded,
        setDocsLoaded,
        removeDocs,
        getInitialDocs,
    };
    return (
        <DocsContext.Provider value={value}>{children}</DocsContext.Provider>
    );
};
