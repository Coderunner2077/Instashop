import React, { useEffect, useRef } from "react";
import Image from "next/image";
import spinner from "../../assets/spinning-circle.gif";
import { getCanvasFontSize, getTextWidth } from "../../utils";

const LoadingButton = ({ loading, disabled, className = "btn-purple-border", size = 14, width, children }) => {
    const buttonRef = useRef(null);
    const spinnerDivRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current; if (!button) return;
        const spinnerDiv = spinnerDivRef.current;
        if (!children) return;
        const buttonWidth = width ?? getTextWidth(button.textContent ?? "", getCanvasFontSize(button)) + 50;

        button.style.width = `${buttonWidth}px`;
        if (!spinnerDiv) return;
        try {
            // @ts-ignore
            const siblingOffsetLeft = button.firstElementChild.classList.contains("absolute") ? button.firstElementChild.nextSibling.offsetLeft : button.firstElementChild.offsetLeft;
            if (!siblingOffsetLeft) throw new Error("Failed to get button's text position");
            spinnerDiv.style.left = siblingOffsetLeft - 16 + "px";
        } catch (err) { spinnerDiv.style.left = "5px"; }

    }, [loading]);

    const handleClick = (e) => {
        if (loading || disabled) e.preventDefault();
    };

    return (
        <button onClick={handleClick} className={`relative ${className} p-2 loading-btn btn`} disabled={loading} ref={buttonRef}>
            {loading && <div className="absolute left-0 flex justify-end w-fit h-fit" ref={spinnerDivRef}><Image src={spinner} width={size} height={size} /></div>}
            {!Array.isArray(children) && <span>{children}</span>}
            {Array.isArray(children) && children.map((child, i) => <span key={`${i}:${child}`}>{child}</span>)}
        </button >
    );
};

export default LoadingButton;
