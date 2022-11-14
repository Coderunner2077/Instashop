import React, { useLayoutEffect, useRef } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { getCanvasFontSize, getTextWidth } from "../../utils";
import { useRequest } from "../hooks"


const SubmitBtn = ({ url, params = {}, method, message, children, className = "button btn-red p-2", size = 14, onSuccess, width, onError = () => { } }) => {
    const buttonRef = useRef(null);
    const spinnerDivRef = useRef(null);

    const { submit, loading, data } = useRequest(url, method, onSuccess, message, params, onError);

    const handleClick = () => {
        if (loading) return;
        submit();
    };

    useLayoutEffect(() => {
        const button = buttonRef.current; if (!button) return;
        const spinnerDiv = spinnerDivRef.current;
        if (!children) return;
        const buttonWidth = width ?? getTextWidth(button.textContent ?? "", getCanvasFontSize(button)) + 50;

        button.style.width = `${buttonWidth}px`;
        const height = button.offsetHeight;
        if (!spinnerDiv) return;
        try {
            // @ts-ignore
            const siblingOffsetLeft = button.firstElementChild.classList.contains("absolute") ? button.firstElementChild.nextSibling.offsetLeft : button.firstElementChild.offsetLeft;
            if (!siblingOffsetLeft) throw new Error("Failed to get button's text position");
            spinnerDiv.style.left = siblingOffsetLeft - 16 + "px";
            spinnerDiv.style.top = Math.floor(height / 3) + "px";
            console.log("height ", height);
        } catch (err) { spinnerDiv.style.left = "5px"; }

    }, [loading]);

    return (
        <button onClick={handleClick} className={`relative ${className}`} disabled={loading} ref={buttonRef}>
            {loading && <div className="absolute left-0 flex justify-end w-fit" ref={spinnerDivRef}><AiOutlineLoading size={size} className={`animate-spin`} /></div>}
            {!Array.isArray(children) && <span>{children}</span>}
            {Array.isArray(children) && children.map((child, i) => <span key={`${i}:${child}`}>{child}</span>)}
        </button >
    );
};

export default SubmitBtn;
