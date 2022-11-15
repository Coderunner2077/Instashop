import React, { useState, useRef, useMemo } from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { BiReset } from "react-icons/bi";
import { useWindowSize, useDebounceEffect } from "../hooks";
import ReactCrop from 'react-image-crop';
import { centerAspectCrop } from "../../utils";
import 'react-image-crop/dist/ReactCrop.css';

const initialCrop = {
	unit: '%', // Can be 'px' or '%'
	x: 25,
	y: 25,
	width: 50,
	height: 50
};

const ImageCropper = ({ src, type, onComplete, onCancel }) => {
	const imgRef = useRef(null);
	const previewCanvasRef = useRef(null);
	const [crop, setCrop] = useState();
	const [completedCrop, setCompletedCrop] = useState();

	const onImageLoad = (e) => {
		const { width, height } = e.currentTarget;
		setCrop(centerAspectCrop(width, height, 1))
		setCompletedCrop(centerAspectCrop(width, height, 1))
	}

	const windowSize = useWindowSize();

	const size = useMemo(() => {
		return windowSize[0] < 640 ? 120 : 200;
	}, [windowSize]);

	useDebounceEffect(async () => {
		if (!completedCrop || !previewCanvasRef.current || !imgRef.current) return;

		const image = imgRef.current;
		image.crossOrigin = "anonymous";
		const canvas = previewCanvasRef.current;
		const crop = completedCrop;

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const pixelRatio = window.devicePixelRatio;

		const cropHeight = crop.height ?? crop.width;

		canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
		canvas.height = Math.floor(cropHeight * scaleY * pixelRatio);

		if (pixelRatio === 1)
			ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

		ctx.imageSmoothingQuality = "high";

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			cropHeight * scaleY,
			0,
			0,
			crop.width * scaleX,
			cropHeight * scaleY
		);

	}, 100, [completedCrop, size]);

	const getBase64 = () => {
		if (!crop || !crop.width || !previewCanvasRef.current) return false;
		return previewCanvasRef.current.toDataURL(type);
	};

	const handleComplete = () => {
		try {
			const base64 = getBase64();
			if (base64) onComplete(base64);
			else handleCancel();
		} catch (err) { console.log("err", err); }
	};

	const handleCancel = () => {
		setCrop(initialCrop);
		setCompletedCrop(undefined);
		onCancel();
	};

	return (
		<div className="flex justify-around items-center bg-blue-200 rounded-b-3xl drop-shadow w-full p-3">
			<div className="flex-grow flex flex-col justify-center items-center sm:flex-row sm:border-r-2 sm:border-gray-500 sm:pr-2 sm:mr-2">
				<ReactCrop
					crop={crop}
					onChange={(_, percentCrop) => setCrop(percentCrop)}
					onComplete={(c) => setCompletedCrop(c)}
					aspect={1}
					className="max-h-300"
				>
					<img ref={imgRef}
						src={src}
						onLoad={onImageLoad}
						crossOrigin="anonymous"
					/>
				</ReactCrop>
				{size < 200 && (
					<>
						<canvas
							ref={previewCanvasRef}
							width={size}
							height={size}
							className="avatar hidden"
							style={{ width: Math.round(size), height: Math.round(size), objectFit: "contain" }}
						/>
						<div className="flex-x pt-3">
							<button onClick={handleComplete} className="button btn-green mr-2">
								<RiCheckboxCircleLine size={20} /> Crop
							</button>
							<button onClick={handleCancel} className="button btn-primary">
								<BiReset size={20} /> Cancel
							</button>
						</div>
					</>
				)}
			</div>
			{size === 200 && (
				<div className="flex flex-col items-center flex-shrink px-1">
					<canvas
						ref={previewCanvasRef}
						width={size}
						height={size}
						className="avatar"
						style={{ width: Math.round(size), height: Math.round(size), objectFit: "contain" }}
					/>
					<div className="flex-x pt-3">
						<button onClick={handleComplete} className="button btn-green mr-2">
							<RiCheckboxCircleLine size={20} /> Crop
						</button>
						<button onClick={handleCancel} className="button btn-primary">
							<BiReset size={20} /> Cancel
						</button>
					</div>
				</div>
			)}
		</div>

	);
};

export default ImageCropper;
