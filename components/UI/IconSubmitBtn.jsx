import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useRequest } from "../hooks"

const IconSubmitBtn = (props) => {
	const {
		url,
		params = {},
		onSuccess,
		icon,
		children = "Edit",
		pm = "px-2 py-1 mx-1",
		position = "relative",
		color = "btn-white",
		message = "",
		onError,
		method
	} = props;

	const { submit, loading, data } = useRequest(url, method, onSuccess, message, params, onError);

	const handleClick = () => {
		if (loading) return;
		submit();
	};

	return (
		<button className={`${position} ${pm} ${color} btn-icon group`} onClick={handleClick}>
			{icon}
			<span className="popup left-10 group-hover:scale-100 active:scale-100 group-focus:scale-100 flex-x">
				{loading && <AiOutlineLoading size={14} className="animate-spin mr-1" />}
				{children}
			</span>
		</button>
	);
};

export default IconSubmitBtn;
