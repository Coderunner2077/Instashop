import React, { useMemo, useState, useRef, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { ProfileIcon, LoginIcon, ProfileLink } from ".";
import { useOnClickOutside } from "../hooks"
import { BiLogOutCircle } from "react-icons/bi";
import { emptyCart } from "../../store/actions";
import { MdShoppingBag } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const NavbarProfile = () => {
    const [display, setDisplay] = useState("hidden");
    const { data: session } = useSession();
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();

    const user = useMemo(() => session && session.user, [session]);
    const handleClick = () => { setDisplay("block") };

    const handleHideDropdown = (event) => {
        setDisplay("hidden");
    }

    useOnClickOutside(dropdownRef, handleHideDropdown);

    const handleSignout = useCallback(() => {
        if (session) {
            dispatch(emptyCart());
            signOut();
        }
    }, [session]);

    return (
        <div className="relative" ref={dropdownRef}>
            <ProfileIcon user={user} onClick={handleClick} />
            <div className={`${display} absolute z-100 w-36 rounded-xl pb-1 -left-[52px] top-8 my-4 text-base list-none bg-white divide-y divide-gray-100 shadow`} id="dropdown">
                <div className="py-3 px-4 text-center flex-x rounded-t-xl relative h-10 bg-red-800 opacity-60 text-white">
                    <span className="block text-sm font-medium truncate cursor-default">{user?.name}</span>
                </div>
                <ul className="py-1 flex-y" aria-labelledby="dropdown">
                    <ProfileLink src={"/profile"} icon={<FaUserAlt size={20} />} text="Profile" position="left-0.5" onClicked={handleHideDropdown} />
                    <ProfileLink src="/order" icon={<MdShoppingBag size={24} />} text="My Orders" onClicked={handleHideDropdown} />
                    <ProfileLink onClick={handleSignout} icon={<BiLogOutCircle size={24} />} text="Logout" />
                </ul>
            </div>
        </div >
    )
}

export default NavbarProfile

