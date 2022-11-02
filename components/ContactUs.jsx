import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MuiTextField, LoadingButton } from "./UI";
import { isEmail, required, vusername, vreview } from "../utils/validate";
import { formatError } from "../utils";
import { useErrorContext } from "../context";
import { useDispatch } from "react-redux";
import { hideModal, addAlert } from "../store/actions";
import { useSession } from "next-auth/react";

const ContactUs = () => {
    const { data: session } = useSession();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isReset, setIsReset] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { valid, updateErrors, useErrorCallbacks } = useErrorContext();
    const { nameError, emailError, messageError } = useErrorCallbacks();

    const currentUser = useMemo(() => {
        return session && session.user
    }, [session])

    useEffect(() => {
        if (session) {
            setName(session.user.name);
            setEmail(session.user.email);
            updateErrors({ name: false, email: !session.user.email, message: true });
        }
    }, [session]);

    const handleSuccess = () => {
        reset();
        dispatch(hideModal());
    };

    const reset = () => {
        setMessage(""); updateErrors({ name: false, email: false, message: true }); setIsReset(!isReset);
    }

    const submitData = useCallback(async (e) => {
        e.preventDefault();
        if (!valid || loading) return;
        setLoading(true);
        try {
            const body = { name, email, message };
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            setLoading(false);
            if (response.status === 200) {
                handleSuccess();
                dispatch(addAlert({ type: "success", message: `Thank you for your message. We'll get back to you within 72 hours` }));
            }
            else
                dispatch(addAlert({ type: "error", message: formatError(data.message) }));
        } catch (error) {
            dispatch(addAlert({ type: "error", message: formatError(error) }));
            setLoading(false);
        }
    }, [name, email, message, valid]);

    return (
        <form className="flex-y p-2 w-full sm:w-96 gap-4" onSubmit={submitData}>
            <MuiTextField onChange={(value) => setName(value)}
                validators={[required, vusername]} label="Name" onError={nameError}
                defaultValue={name || ""}
                disabled={currentUser && !!currentUser.name}
            />

            <MuiTextField type="email" onChange={(value) => setEmail(value)}
                validators={[required, isEmail]} label="Email" onError={emailError}
                defaultValue={email || ""}
                disabled={currentUser && !!currentUser.email}
            />

            <MuiTextField onChange={(value) => setMessage(value)}
                validators={[required, vreview]} label="Your message" onError={messageError}
                multiline={true} reset={isReset}
            />

            <div className="flex-x">
                <LoadingButton loading={loading}
                    disabled={!valid}
                >
                    Send
                </LoadingButton>
            </div>
        </form>
    );
};

export default ContactUs;
