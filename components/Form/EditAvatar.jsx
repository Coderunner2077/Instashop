import React, { useState, useEffect, useRef } from "react";
import { IconSubmitBtn, IconButton } from "../UI";
import { DropZone } from "../Image"
import { RiCheckboxCircleLine } from "react-icons/ri";
import { BiReset } from "react-icons/bi";
import { useAvatarContext } from "../../context/AvatarContext";
import { Label } from ".";

const EditAvatar = () => {
	const { avatar, updateAvatar } = useAvatarContext();
	const [src, setSrc] = useState(avatar);
	const formData = useRef(null);
	const [avatarChanged, setAvatarChanged] = useState(false);
	const [validImage, setValidImage] = useState(true);
	const [reset, setReset] = useState(false);

	useEffect(() => {
		setSrc(avatar);
	}, [avatar]);

	const handleAvatarChange = (src, blob) => {
		setSrc(src);
		setValidImage(true);
		if (blob) formData.current = blob;
		let bool = true;
		if (!src && !avatar) bool = false;
		setAvatarChanged(bool);
	};

	const handleSuccess = (user) => {
		setSrc(user.image);
		updateAvatar(user.image);
		setAvatarChanged(false);
		setValidImage(true);
	};

	const handleReset = () => {
		setAvatarChanged(false);
		setValidImage(true);
		setReset(!reset);
	};

	return (
		<div className="flex flex-col sm:flex-row justify-start items-start sm:items-center w-full mb-3">
			<Label htmlFor={"avatar"} className="h-12 w-32 sm:w-28 mb-4 sm:mb-0 self-center" rounded={true}>
				Avatar
			</Label>
			<DropZone onChange={handleAvatarChange} displaySize={200} onError={() => setValidImage(false)} reset={reset} />
			{avatarChanged && (
				<div className="relative">
					<IconButton
						onClick={handleReset}
						pm="px-2"
						icon={<BiReset size={24} />}
						position="absolute bottom-20 left-52 sm:bottom-3 sm:left-3"
						color={"btn-blue"}
					>
						Reset
					</IconButton>
					{src && validImage && (
						<IconSubmitBtn
							url="/api/profile/avatar"
							method="put"
							data={{ file: src }}
							onSuccess={handleSuccess}
							pm="px-2"
							icon={<RiCheckboxCircleLine size={24} />}
							position="absolute bottom-12 left-52 sm:-bottom-4 sm:left-3"
							color={"btn-blue"}
							message={"You successfully changed your profile picture"}
						>
							Save
						</IconSubmitBtn>
					)}
					{!src && avatar && (
						<IconSubmitBtn
							url="/api/profile/avatar"
							method="delete"
							onSuccess={handleSuccess}
							pm="px-2"
							icon={<RiCheckboxCircleLine size={24} />}
							position="absolute bottom-12 left-52 sm:-bottom-4 sm:left-3"
							color={"btn-blue"}
							message={"You successfully deleted your profile picture"}
						>
							Save
						</IconSubmitBtn>
					)}
				</div>
			)}
		</div>
	);
};

export default EditAvatar;
