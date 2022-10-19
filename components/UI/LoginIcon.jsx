import React, { useMemo, useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";

const LoginIcon = () => {
    const { data: session } = useSession();

    const handleClick = useCallback(() => {
        if (session) signOut();
        else signIn();
    }, [session]);

    const icon = useMemo(() => (
        session ? <BiLogOutCircle size={28} /> : <BiLogInCircle size={28} />
    ), [session])

    const text = useMemo(() => (
        session ? "Logout" : "Login"
    ), [session])

    return (
        <div className={``} onClick={handleClick}>
            <div className="flex-x cursor-pointer">
                <Icon className="cart-icon flex-x">{icon}</Icon>
                <div className="w-8 h-10 flex-x text-gray-700 text-lg">
                    {text}
                </div>
            </div>
        </div>
    );
};

const Icon = ({ className, children }) => <div className={className}>{children}</div>;

export default LoginIcon;