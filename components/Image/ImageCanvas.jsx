import React, { useState, useRef, useEffect, useMemo } from "react";
import { crop } from "../../utils";
import { useWindowSize } from "../hooks";

const ImageCanvas = ({ src, width, height, smSize = 120,
	className = "avatar cursor-pointer animate-turn-left-down", onClick, onMouseOver, onMouseLeave }) => {
	const canvasRef = useRef(null);
	const [url, setUrl] = useState(src);

	const windowSize = useWindowSize();

	const size = useMemo(() => {
		return windowSize[0] < 640 ? smSize : width;
	}, [windowSize, width]);

	useEffect(() => {
		if (src && canvasRef.current)
			crop(src, 1, canvasRef.current)
				.then((canvas) => {
					setUrl(canvas.toDataURL());
				});
	}, [src, width, size]);

	const handleClick = (e) => {
		onClick(src);
	}

	return (
		<>
			<canvas
				ref={canvasRef}
				className={`${className}`}
				width={size}
				height={size}
				style={{ width: Math.round(size), height: Math.round(size) }}
				onClick={handleClick}
				onMouseOver={onMouseOver}
				onMouseLeave={onMouseLeave}
			/>
		</>
	);
};

export default ImageCanvas;
