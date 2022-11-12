import React from "react";
import Link from "next/link";

const ProfileLink = ({ src, icon, text, onClick, position = "" }) => {
    return (
        <li className="w-full mx-0">
            {src ? (
                <Link href={src}>
                    <div className={`relative flex gap-1 link py-2 px-4 hover:bg-gray-100 cursor-pointer`}>
                        <span className={`relative ${position}`}>{icon}</span>
                        <span className={`relative link ml-1 ${position}`}>{text}</span>
                    </div>
                </Link>
            ) : (
                <div onClick={onClick} className="relative flex gap-1 link py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    {icon}
                    <span className="link ml-1">{text}</span>
                </div>
            )}

        </li>
    )
};

export default ProfileLink;