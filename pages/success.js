import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { emptyCart } from '../store/actions';
import { showModal } from "../store/actions";
import { ContactUs } from "../components";
import { ErrorContext } from "../context";
import { useRouter } from "next/router";

import { runFireworks } from '../lib/utils.js';

const Success = () => {
    const dispatch = useDispatch();
    const {
        query: { session_id }
    } = useRouter();

    useEffect(async () => {
        const response = await fetch(`/api/stripe/${session_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json()
        const response2 = await fetch("/api/webhook", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        const data2 = await response2.json();
        console.log("data1: ", data)
        console.log("data2: ", data2)

        dispatch(emptyCart());
        runFireworks();

    }, []);

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