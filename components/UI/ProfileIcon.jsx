import React, { useMemo, useCallback } from "react";
import Image from "next/image";

const ProfileIcon = ({ user, onClick }) => {
    const handleClick = () => {
        if (onClick) onClick();
    }

    const text = useMemo(() => (
        user ? user.name : ""
    ), [user])

    const src = useMemo(() => user ? user.image : "", [user])

    return (
        <div className={``} onClick={handleClick}>
            <div className="flex-x cursor-pointer w-12 h-12">
                <Image src={src} className="avatar" width={30} height={30} />
            </div>
        </div>
    );
};

export default ProfileIcon;