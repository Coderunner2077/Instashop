import React from "react";
import { IconButton } from "./";
import { ImCross } from "react-icons/im";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { BiError } from "react-icons/bi";

const AlertMessage = ({ type, message, animation, onMouseMove, onCloseClick, className = "w-5/6 md:w-3/5" }) => {
    return (
        <div
            className={`
				alert mb-3 ${className}
				${type === "error" ? "alert-danger" : "alert-success"} ${animation ?? ""}`}
            onMouseMove={onMouseMove}
        >
            <div className="sm:font-h3 sm:text-xl font-semibold select-none ml-2 flex">
                {type === "success" && <RiCheckboxCircleFill size={28} className="mr-2" />}
                {type === "error" && <BiError size={28} className="mr-2" />}
                {message}
            </div>
            {onCloseClick && (
                <button className={`relative mx-1 p-2 group rounded-full transition-all btn-close font-semidold`} onClick={onCloseClick}>
                    <ImCross size={13} />
                    <div className={`popup hidden sm:inline-block scale-0 left-10 group-hover:scale-100 -top-2`}>Close</div>
                </button>
            )}
        </div>
    );
};

export default AlertMessage;