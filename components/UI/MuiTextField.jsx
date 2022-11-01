import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

const MuiTextField = ({ className = "", defaultValue = "", disabled = false, checkValue, label, multiline = false, onError, onChange, reset, type = "text", validators }) => {
    const [value, setValue] = useState(defaultValue);
    const [errors, setErrors] = useState([]);
    const [fullClassName, setFullClassName] = useState(className);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        setValue("");
        setErrors([]);
        setFullClassName(className);
    }, [reset]);

    useEffect(() => {
        if (checkValue === undefined) return;
        if (value)
            validate(value);
    }, [checkValue]);

    const handleChange = (e) => {
        setValue(e.currentTarget.value);
        if (e.currentTarget.value === "" || e.currentTarget.value.length > 0 || errors.length) {
            validate(e.currentTarget.value);
        }
    };

    const validate = (value) => {
        setFullClassName(className);
        let errs = validators.map((validator) => {
            return !checkValue ? validator(value) : validator(value, checkValue);
        });

        errs = errs.filter((error) => error !== null && error !== undefined);
        if (errs.length) {
            setFullClassName(`${className} error`);
            if (onError) onError(true);
        } else {
            onChange(value);
            if (onError) onError(false);
        }

        setErrors(errs);
    };

    const handleBlur = () => {
        validate(value);
    }

    return (
        <TextField
            value={value}
            error={errors.length > 0}
            label={label} variant="filled" type={type}
            onChange={handleChange}
            autoComplete="off"
            helperText={errors.length ? <span className="inline-block text-xs absolute">{errors[0]}</span> : <span className="inline-block text-xs absolute">{" "}</span>}
            className={fullClassName}
            onBlur={handleBlur}
            multiline={multiline}
            disabled={disabled}
            rows={multiline ? 5 : 1}
            autoCorrect={"off"}
            size="small"
            sx={{ borderRadius: "5px" }}
        />
    );
};

export default MuiTextField;