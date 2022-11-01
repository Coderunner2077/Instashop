import React, { useState, useMemo, createContext, useContext } from "react";
import { arrayToObject } from "../utils";


export const errorContext = createContext({
    valid: true,
    updateErrors: (errors) => { },
    useErrorCallbacks: () => { }
});

const ErrorContext = ({ children, errors: defaultErrors }) => {
    const [errors, setErrors] = useState(arrayToObject(defaultErrors, true));

    const updateErrors = (errors) => {
        setErrors(errors);
    }

    const updateError = (key, bool) => {
        setErrors((prevErrors) => { return { ...prevErrors, [key]: bool } })
    }

    const valid = useMemo(() => {
        return Object.values(errors).includes(true) === false;
    }, [errors]);

    const useErrorCallbacks = () => {
        return useMemo(() => {
            const validators = {};
            for (const key in errors)
                validators[`${key}Error`] = (bool) => updateError(key, bool);
            return validators;
        }, [])

    }

    return <errorContext.Provider value={{ valid, updateErrors, useErrorCallbacks }}>{children}</errorContext.Provider>;
}

export default ErrorContext;

export const useErrorContext = () => {
    const context = useContext(errorContext);
    if (!context) throw new Error("Error in creating the context");

    return context;
}