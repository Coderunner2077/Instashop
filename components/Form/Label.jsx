import React from "react";

const Label = ({ htmlFor, children, rounded = false, className }) => {
	const roundedRight = rounded ? "rounded-r-full" : "rounded-r-xl";
	return (
		<label
			htmlFor={htmlFor}
			className={`${roundedRight} border-2 border-blue-800 inline-block rounded-l-full bg-gradient-to-r from-red-400 via-orange-300 to-red-400 p-1 ${className}`}
		>
			<span className={`bg-blue-700 text-white font-semibold rounded-l-full inline-block py-auto px-2 w-full h-full ${roundedRight}`}>
				{children}
			</span>
		</label>
	);
};

export default Label;
