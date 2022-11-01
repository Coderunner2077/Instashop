import React from "react";
import Link from "next/link";

const IconLink = ({ text, to, color = "text-blue-500", bg = "bg-gray-100", onClick, children }) => {
    const handleClick = () => { if (onClick) onClick(); }

    return to ? (
        <Link href={to} legacyBehavior><a target="_blank" className={`btn-icon ${color} ${bg} relative h-10 w-10 my-2 mx-auto group z-10 overflow-visible`}>
            {children}
            <span className="popup left-10 group-hover:scale-100 translate-y-20">{text}</span>
        </a></Link>
    ) : (
        <div className={`btn-icon ${color} ${bg} relative h-10 w-10 my-2 mx-auto group z-10`} onClick={handleClick}>
            {children}
            <span className="popup left-10 group-hover:scale-100">{text}</span>
        </div>
    );
};

export default IconLink;
