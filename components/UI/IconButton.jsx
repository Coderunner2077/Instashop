import React from "react";

const IconButton = (props) => {
    const {
        onClick,
        icon,
        children = "Edit",
        pm = "mx-1 p-2",
        position = "relative",
        color = "btn-white",
        className = "btn-icon",
        left = "left-10",
        top = ""
    } = props;

    return (
        <button className={`${className} ${position} ${pm} ${color} group`} onClick={onClick}>
            {icon}
            <span className={`popup group-hover:scale-100 ${left} ${top} sm:top-auto sm:left-10`}>{children}</span>
        </button>
    );
};

export default IconButton;