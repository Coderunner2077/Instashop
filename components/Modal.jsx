import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "./UI";
import { ImCross } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../store/actions";

const Modal = () => {
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();
    const { modal } = useSelector((state) => state.modal);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!modal) return null;

    const onCloseClick = () => {
        dispatch(hideModal());
    };

    return mounted ? createPortal(
        <div
            className="modal-overlay fixed top-0 left-0 w-screen h-screen z-1040 bg-black bg-opacity-50 overflow-hidden outline-none flex items-center"
            onClick={onCloseClick}
        >
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`modal-header flex items-center justify-between ${modal.title ? "px-2 sm:px-4 py-2 sm:py-4 border-b-2 border-blue-400" : "pt-2"}`}>
                    <h4 className="font-h3 text-blue-800 text-xl font-semibold select-none ml-2">{modal.title ?? ""}</h4>
                    <IconButton icon={<ImCross size={13} />} onClick={onCloseClick} color="btn-gray-line">
                        Close
                    </IconButton>
                </div>
                <div className="modal-body p-0.5 xs:p-1 sm:p-4">{modal.body}</div>
            </div>
        </div>,
        document.getElementById("modal") || document.body
    ) : null
};

export default Modal;