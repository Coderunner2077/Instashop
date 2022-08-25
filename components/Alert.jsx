import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { deleteAlert } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { AlertMessage } from "./UI";

const Alert = () => {
    const alert = useSelector((state) => state.flash.alert);
    const timeoutRef = useRef(null);
    const dispatch = useDispatch();
    const [animation, setAnimation] = useState("");

    useEffect(() => {
        setAnimation("animate-alert-in");
        clearTimeout(timeoutRef.current);
        if (alert) {
            timeoutRef.current = setTimeout(() => {
                setAnimation("animate-alert-out");
                timeoutRef.current = setTimeout(() => {
                    dispatch(deleteAlert());
                }, 2700);
            }, 300);
        }

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [alert]);

    const onCloseClick = () => {
        clearTimeout(timeoutRef.current);
        dispatch(deleteAlert());
    };

    const resetTimeout = (e) => {
        e.stopPropagation();
        setAnimation("animate-none");
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setAnimation("animate-alert-out");
            timeoutRef.current = setTimeout(() => {
                dispatch(deleteAlert());
            }, 2700);
        }, 300);
    };

    if (!alert) return null;

    return (
        <div className="fixed top-8 left-0 w-full h-auto z-1050 bg-transparent flex-y pointer-events-none">
            <AlertMessage
                type={alert.type}
                message={alert.message}
                animation={animation}
                onMouseMove={resetTimeout}
                onCloseClick={onCloseClick}
            />
        </div>
    );
};

export default Alert;
