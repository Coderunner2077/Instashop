import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, addAlert } from '../store/actions';
import { showModal } from "../store/actions";
import { ContactUs } from "../components";
import { ErrorContext } from "../context";
import { useRouter } from "next/router";
import http from "../lib/http";
import { formatError } from '../utils';
import { runFireworks } from "../lib/utils"

const Success = () => {
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(false);
    const {
        query: { session_id }
    } = useRouter();
    const { cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        if (!session_id) return;
        http.get(`/api/stripe/${session_id}`)
            .then(res => {
                if (res.status === 200) {
                    if (cartItems)
                        http.post("/api/order", { cartItems })
                            .then(res => {
                                setSuccess(true);
                                dispatch(emptyCart());
                                runFireworks();
                            })
                            .catch(err => dispatch(addAlert({ type: "error", message: formatError(err) })))

                } else
                    throw new Error("Sorry, your order has been aborted");
            })
            .catch(err => dispatch(addAlert({ type: "error", message: formatError(err) })))
    }, [session_id]);

    const handleContact = () => {
        dispatch(showModal({ title: "Contact us", body: <ErrorContext errors={["name", "email", "message"]}><ContactUs /></ErrorContext> }));
    }

    return (
        <div className="min-h-[69vh] md:min-h-[60vh] bg-white">
            <div className="flex-y gap-3 w-full sm:w-3/5 bg-gray-500 rounded-2xl p-10 mx-auto mt-10">
                <p className="text-green-800 font-extrabold text-4xl mt-2">
                    <BsBagCheckFill />
                </p>
                <h2 className="text-4xl text-blue-900 font-extrabold">Thank you for your order!</h2>
                <p className="text-black text-xs">Check your email inbox for the receipt.</p>
                <p className="text-lg">
                    If you have any questions, please
                    <button className="text-red-600 ml-2" onClick={handleContact}>
                        contact us
                    </button>
                </p>
                <p className="flex-x gap-3 mt-3">
                    <Link href="/order">
                        <button type="button" width="150px" className="btn btn-link">
                            View Order
                        </button>
                    </Link>
                    <Link href="/">
                        <button type="button" width="150px" className="btn btn-red">
                            Continue Shopping
                        </button>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Success