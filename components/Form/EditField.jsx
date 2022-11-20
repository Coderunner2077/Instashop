import React, { useState } from "react";
import { IconButton, IconSubmitBtn } from "../UI";
import { MdModeEdit } from "react-icons/md";
import { BiReset } from "react-icons/bi";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { Input } from ".";
import { capitalizeFirst } from "../../utils";

const EditField = ({ defaultData = "", onChange, onSave, validators = [], name = "", label }) => {
    const [editField, setEditField] = useState(false);
    const [data, setData] = useState("");
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [valid, setValid] = useState(true);
    const [reset, setReset] = useState(false);

    const handleDataChange = (value) => {
        setValid(true);
        setUnsavedChanges(true);
        setData(value);
        if (value !== defaultData && onChange) onChange(true);
    };

    const handleSuccess = (user) => {
        setUnsavedChanges(false);
        setEditField(false);
        setData(user[name]);
        onSave(user[name]);
    };

    const handleReset = () => {
        setEditField(false);
        setData("");
        setUnsavedChanges(false);
        setValid(true);
        setReset(!reset);
        if (onChange) onChange(false);
    };

    return (
        <div className="flex-x">
            <Input
                id={data}
                label={label ?? capitalizeFirst(name)}
                disabled={!editField}
                initValue={defaultData}
                onChange={handleDataChange}
                validators={validators}
                onError={() => setValid(false)}
                reset={reset}
                focus={editField}
                placeholder={label ?? capitalizeFirst(name)}
            />
            <div className="w-12 h-full flex-x justify-start">
                {!editField && (
                    <IconButton onClick={() => setEditField(true)} pm="px-2 mx-1" icon={<MdModeEdit size={24} />}>
                        Edit
                    </IconButton>
                )}
                {unsavedChanges && data != defaultData && (
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
                                url={`/api/profile/${name}`}
                                method="put"
                                data={{ [name]: data }}
                                onSuccess={handleSuccess}
                                pm="px-2"
                                icon={<RiCheckboxCircleLine size={24} />}
                                position="absolute top-3"
                                color={"btn-blue"}
                                message={`You successfully changed your ${label ? label.toLowerCase() : name}`}
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

export default EditField;
