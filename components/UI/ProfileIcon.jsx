import React, { useMemo } from "react";
import Image from "next/image";
import { avatarSrc } from "../../constants";

const ProfileIcon = ({ user, onClick }) => {
    const handleClick = () => {
        if (onClick) onClick();
    }

    const text = useMemo(() => (
        user ? user.name : ""
    ), [user])

    const src = useMemo(() => user && user.image ? user.image : avatarSrc, [user])

    return (
        <div className={``} onClick={handleClick}>
            <div className="flex-x cursor-pointer w-10 h-10 avatar">
                <Image src={src} className="avatar object-cover" width={30} height={30} />
            </div>
        </div>
    );
};

export default ProfileIcon;