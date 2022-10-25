import React, { useEffect, useState, useRef } from "react";
import { inputWidth, floatingLabel } from "../../constants";

const Input = (props) => {
    const {
        id,
        type = "text",
        label,
        disabled,
        onChange,
        initValue,
        onError,
        validators = [],
        reset,
        className = inputWidth,
        labelClass = floatingLabel,
        placeholder,
        textarea = false,
        onBlur,
        onEnter,
        focus, checkValue
    } = props;
    const [value, setValue] = useState(initValue);
    const [errorClass, setErrorClass] = useState("");
    const [errors, setErrors] = useState([]);
    const textareaRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setValue(initValue);
        setErrors([]);
        setErrorClass("");
    }, [reset]);

    useEffect(() => {
        setValue(initValue ?? "");
    }, [initValue]);

    useEffect(() => {
        if (!checkValue) return;
        if (value)
            validate(value);
    }, [checkValue]);

    useEffect(() => {
        if (textareaRef.current)
            textareaRef.current.focus()
        if (inputRef.current)
            inputRef.current.focus();
    }, [focus]);

    const handleChange = (e) => {
        setValue(e.target.value);
        validate(e.target.value);
    };

    const validate = (value) => {
        setErrorClass("");
        let errs = validators.map((validator) => {
            return !checkValue ? validator(value) : validator(value, checkValue)
        });

        errs = errs.filter((error) => error !== null && error !== undefined);
        if (errs.length) {
            setErrorClass(`error`);
            if (!value) onChange(value);
            if (onError) onError();
        } else onChange(value);

        setErrors(errs);
    };

    const handleBlur = (e) => {
        if (onBlur) onBlur(e);
    };

    const onKeyDown = (e) => {
        if (e.defaultPrevented || e.key !== "Enter") return;
        if (onEnter) onEnter(value);
    }

    return (
        <div className={`relative input-container ${className}`}>
            {textarea && (
                <textarea
                    ref={textareaRef}
                    id={id}
                    disabled={disabled}
                    onChange={handleChange}
                    placeholder={`${placeholder ? placeholder + "..." : ""}`}
                    className={`${errorClass} input-r-rounded w-full rounded-l-full block p-2 appearance-none focus:outline-none`}
                    value={value}
                    onBlur={handleBlur}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                    autoComplete="new-off"
                />
            )}
            {!textarea && (
                <input
                    ref={inputRef}
                    type={type}
                    id={id}
                    value={`${value ?? ""}`}
                    disabled={disabled}
                    onChange={handleChange}
                    placeholder={`${placeholder ? placeholder + "..." : ""}`}
                    className={`rounded-l-full ${errorClass} w-full input-r-rounded block p-2 sm:p-3 appearance-none focus:outline-none`}
                    autoComplete="new-off"
                    onBlur={handleBlur}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                />
            )}
            {label &&
                <label htmlFor={id} className={labelClass}>{label}</label>
            }
            <div className={`absolute text-xs -bottom-1`}>
                {errors.length > 0 && (
                    <div className="text-red-500 whitespace-nowrap error" role="alert">
                        {errors[0]}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
