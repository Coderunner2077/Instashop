import React, { useState } from "react";
import { IconButton, IconSubmitBtn } from "../UI";
import { MdModeEdit } from "react-icons/md";
import { BiReset } from "react-icons/bi";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { required, isEmail } from "../../utils/validate";
import { Input } from ".";

const EditEmail = ({ defaultEmail = "", onChange, onSave }) => {
    const [editEmail, setEditEmail] = useState(false);
    const [email, setEmail] = useState(defaultEmail);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [valid, setValid] = useState(true);
    const [reset, setReset] = useState(false);
    const [focus, setFocus] = useState(false);

    const handleEmailChange = (value) => {
        setValid(true);
        setUnsavedChanges(true);
        setEmail(value);
        if (value !== defaultEmail && onChange) onChange(true);
    };

    const handleSuccess = (user) => {
        setUnsavedChanges(false);
        setEditEmail(false);
        setEmail(user.email);
        onSave(user.email);
    };

    const handleReset = () => {
        setEditEmail(false);
        setEmail(`${defaultEmail}`);
        setUnsavedChanges(false);
        setValid(true);
        setReset(!reset);
        if (onChange)
            onChange(false);
    };

    const handleError = (error) => {
        setFocus(!focus);
    }

    return (
        <div className="flex-x mb-2">
            <Input
                id="email"
                label="Email"
                type="email"
                disabled={!editEmail}
                initValue={defaultEmail}
                onChange={handleEmailChange}
                validators={[required, isEmail]}
                onError={() => setValid(false)}
                reset={reset}
                focus={focus}
                placeholder="Email"
            />
            <div className="w-12 h-full flex-x justify-start">
                {!editEmail && (
                    <IconButton onClick={() => setEditEmail(true)} pm="px-2 mx-1" icon={<MdModeEdit size={24} />}>
                        Edit
                    </IconButton>
                )}
                {unsavedChanges && email != defaultEmail && (
                    <div className="relative">
                        <IconButton
                            onClick={handleReset}
                            pm="px-2"
                            icon={<BiReset size={24} />}
                            position="absolute bottom-3"
                            color={"btn-blue"}
                        >
                            Reset
                        </IconButton>
                        {valid && (
                            <IconSubmitBtn
                                url="/api/profile/email"
                                method="put"
                                params={{ email }}
                                onSuccess={handleSuccess}
                                pm="px-2"
                                icon={<RiCheckboxCircleLine size={24} />}
                                position="absolute top-3"
                                color={"btn-blue"}
                                message={"You successfully changed your email"}
                                onError={handleError}
                            >
                                Save
                            </IconSubmitBtn>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditEmail;
