import React, { useContext, useReducer } from "react";

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
            return [...state, action.doc];
        default:
            return state;
    }
};

export const DocsProvider = ({ children }) => {
    const [docs, dispatchDocs] = useReducer(reducer, initialDocs);

    const value = { docs, dispatchDocs };
    return (
        <DocsContext.Provider value={value}>{children}</DocsContext.Provider>
    );
};
