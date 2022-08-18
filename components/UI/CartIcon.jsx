import React, { useMemo } from "react";
import Link from "next/link";

const CartIcon = ({ icon, to, counter = 0, onClick }) => {

    const count = counter > 0 ? counter : "";

    const handleClick = (e) => {
        if (onClick) onClick(e);
    };

    const iconContent = useMemo(() => (
        <React.Fragment>
            <div className="flex-x">
                <Icon className="cart-icon flex-x cursor-pointer">{icon}</Icon>
                <div className="w-8 h-10 bg-gray-500">
                    {counter > 0 && (
                        <span className={`inline-block badge-red px-2 rounded-full text-xs cursor-pointer`}>
                            {counter < 100 ? count : "99+"}
                        </span>
                    )}
                    {counter < 1 && <div className="w-8 h-8 px-8 py-2 text-white cursor-default opacity-0 select-none">000</div>}
                </div>
            </div>
        </React.Fragment>
    ), [counter])

    return (
        <div className={``} onClick={handleClick}>
            {to && <Link href={`${to}`}>{iconContent}</Link>}
            {!to && iconContent}
        </div>
    );
};

const Icon = ({ className, children }) => <div className={className}>{children}</div>;

export default CartIcon;