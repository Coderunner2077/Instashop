import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { emptyCart } from '../store/actions';

import { runFireworks } from '../lib/utils.js';

const Success = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(emptyCart());
        runFireworks();
    }, []);

    return (
        <div className="min-h-[69vh] md:min-h-[60vh] bg-white">
            <div className="flex-y gap-3 w-full sm:w-3/5 bg-gray-500 rounded-2xl p-10 mx-auto mt-10">
                <p className="text-green-800 font-extrabold text-4xl mt-2">
                    <BsBagCheckFill />
                </p>
                <h2 className="text-4xl text-blue-900 font-extrabold">Thank you for your order!</h2>
                <p className="text-black text-xs">Check your email inbox for the receipt.</p>
                <p className="text-lg">
                    If you have any questions, please email
                    <a className="text-red-600 ml-2" href="mailto:coderunner2077@gmail.com">
                        coderunner2077@gmail.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn btn-red mt-3">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success