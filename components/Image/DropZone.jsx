import React, { useState, useEffect, useRef } from "react";
import { IconButton } from "../UI";
import { ImageCanvas, ImageCropper } from ".";
import { useDispatch } from "react-redux";
import { showModal, hideModal, addAlert } from "../../store/actions";
import { useAvatarContext } from "../../context/AvatarContext";

import { validateFileNumber, validateFileType, validateFileSize } from "../../utils/validateFile";
import { formatFileSize, getReadFile, getMimeType } from "../../utils";

import { FcUpload } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import { MdChangeCircle } from "react-icons/md";

import "react-image-crop/dist/ReactCrop.css";

const DropZone = (props) => {
	const { maxSize = 12_000_000, displaySize, onChange, onError, reset } = props;
	const dispatch = useDispatch();
	const { avatar } = useAvatarContext();
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [validFiles, setValidFiles] = useState([]);
	const [src, setSrc] = useState("");
	const [isDragging, setIsDragging] = useState(false);
	const maxNumber = 1;
	const fileInputRef = useRef(null);

	// Html Drag & Drop
	const dragOver = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const dragEnter = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const dragLeave = (e) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const fileDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		const files = e.dataTransfer.files;
		if (files.length) handleFiles(files);
	};

	const handleFiles = (files) => {
		const selectedFiles = [];
		if (!validateFileNumber(files, maxNumber)) {
			setErrorMessage(`Too many files, max ${maxNumber} allowed`);
			return;
		}
		for (const file of files) {
			if (!validateFileType(file)) {
				console.log("error: ", errorMessage);
				setErrorMessage("File type not permitted");
				onError();
			} else if (!validateFileSize(file, maxSize)) {
				setErrorMessage(`Too large file (max. ${formatFileSize(maxSize)} allowed)`);
				onError();
			}
			selectedFiles.push(file);
		}
		setSelectedFiles(selectedFiles);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const fileInputClicked = () => {
		fileInputRef?.current?.click();
	};

	const filesSelected = () => {
		if (fileInputRef?.current?.files?.length) handleFiles(fileInputRef.current.files);
	};

	const removeFile = () => {
		setValidFiles([]);
		setSelectedFiles([]);
		setSrc("");
		setErrorMessage("");
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	// Use effects
	useEffect(() => {
		setSrc(avatar);
	}, [avatar]);

	useEffect(() => {
		setSelectedFiles([]);
		setSrc(avatar);
		if (fileInputRef.current?.files) fileInputRef.current.value = "";
	}, [reset]);

	useEffect(() => {
		const validFiles = selectedFiles.filter((file) => file.invalid !== true);
		setValidFiles(validFiles);
		if (!validFiles.length) return;

		getReadFile(validFiles[0]).then((base64) => {
			setSrc(base64);
			onChange(base64);
		});
	}, [selectedFiles]);

	useEffect(() => {
		if (errorMessage) {
			dispatch(addAlert({ type: "error", message: errorMessage }));
			setErrorMessage("");
		}
	}, [errorMessage]);

	// Image crop
	const onCrop = (cropped) => {
		setValidFiles([cropped]);
	};

	const onCropComplete = (base64) => {
		setSrc(base64);
		onChange(base64);
		dispatch(hideModal());
	};

	const onCropCancel = () => {
		dispatch(hideModal());
	};

	const handleCropStart = (uri) => {
		dispatch(
			showModal({
				title: "Crop your avatar",
				body: (
					<ImageCropper
						src={src}
						type={validFiles[0] ? getMimeType(validFiles[0].name) : "image/png"}
						onComplete={onCropComplete}
						onCancel={onCropCancel}
					/>
				)
			})
		);
	};

	return (
		<div className="relative">
			<div className={`flex justify-start items-center w-28 h-28 sm:w-48 sm:h-48 mx-1 mb-0`}>
				{!src && (
					<div
						className={`drop-container relative transition-all btn-drag pb-1 sm:pt-3 px-2 ml-2 group border-4 border-dashed animate-turn-down ${isDragging ? "bg-gray-400 border-red-500" : "border-sky-500"
							}`}
						onDragOver={dragOver}
						onDragEnter={dragEnter}
						onDragLeave={dragLeave}
						onDrop={fileDrop}
						onClick={fileInputClicked}
					>
						<div className="text-sky-500 w-24 sm:w-auto sm:text-xl text-center">
							<FcUpload size={70} className="block text-center sm:pt-8 my-0 mx-auto max-h-10 sm:max-h-32" />
							<span className="btn-red-line group-hover:font-semibold group-hover:text-red-600">
								Drag &amp; Drop image here <span className="hidden sm:inline">or click to upload</span>
							</span>
						</div>
					</div>
				)}
				<input
					ref={fileInputRef}
					className="hidden"
					type="file"
					multiple
					onChange={filesSelected}
					accept={"image/jpg, image/jpeg, image/png"}
				/>
				&nbsp;
				{src && (
					<div className="relative bottom-2">
						<ImageCanvas
							src={src}
							width={displaySize}
							height={displaySize}
							onClick={handleCropStart}
						/>
						<IconButton
							onClick={() => {
								removeFile();
								onChange(null);
							}}
							pm=""
							icon={<ImCross size={22} className="max-h-4 sm:max-h-12" />}
							position="absolute top-2 -right-2 sm:right-1"
							color="btn-red-line"
							left="left-6"
						>
							Remove
						</IconButton>
						<IconButton
							onClick={fileInputClicked}
							pm=""
							icon={<MdChangeCircle size={26} className="max-h-5 max-w-5 sm:max-w-12 sm:max-h-12" />}
							position="absolute bottom-1 -right-3 sm:bottom-2 sm:right-0"
							color="btn-blue rounded-full"
							left="left-6"
						>
							Update
						</IconButton>
					</div>
				)}
			</div>
		</div>
	);
};

export default DropZone;
