import React, { useState } from "react";
import { IconButton, IconSubmitBtn } from "../UI";
import { MdModeEdit } from "react-icons/md";
import { BiReset } from "react-icons/bi";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { required, vusername } from "../../utils/validate";
import { Input } from ".";

const EditUsername = ({ defaultUsername = "", onChange, onSave }) => {
	const [editUsername, setEditUsername] = useState(false);
	const [username, setUsername] = useState("");
	const [unsavedChanges, setUnsavedChanges] = useState(false);
	const [valid, setValid] = useState(true);
	const [reset, setReset] = useState(false);

	const handleUsernameChange = (value) => {
		setValid(true);
		setUnsavedChanges(true);
		setUsername(value);
		if (value !== defaultUsername) onChange(true);
	};

	const handleSuccess = (user) => {
		setUnsavedChanges(false);
		setEditUsername(false);
		setUsername(user.username);
		onSave(user.username);
	};

	const handleReset = () => {
		setEditUsername(false);
		setUsername("");
		setUnsavedChanges(false);
		setValid(true);
		setReset(!reset);
		onChange(false);
	};

	return (
		<div className="flex-x">
			<Input
				id="username"
				label="Username"
				disabled={!editUsername}
				initValue={defaultUsername}
				onChange={handleUsernameChange}
				validators={[required, vusername]}
				onError={() => setValid(false)}
				reset={reset}
				focus={editUsername}
				placeholder="Username"
			/>
			<div className="w-12 h-full flex-x justify-start">
				{!editUsername && (
					<IconButton onClick={() => setEditUsername(true)} pm="px-2 mx-1" icon={<MdModeEdit size={24} />}>
						Edit
					</IconButton>
				)}
				{unsavedChanges && username != defaultUsername && (
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
								url="/api/profile/name"
								method="put"
								params={{ username }}
								onSuccess={handleSuccess}
								pm="px-2"
								icon={<RiCheckboxCircleLine size={24} />}
								position="absolute top-3"
								color={"btn-blue"}
								message={"You successfully changed your username"}
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

export default EditUsername;
