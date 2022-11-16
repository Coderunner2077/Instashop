import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { reloadSession, localeDate } from "../../utils";
import { useFetch } from "../../components/hooks";
import { client, urlFor } from "../../lib/client";
import { AiOutlineLoading } from "react-icons/ai";

function Order() {
    const [normalizedOrders, setNormalizedOrders] = useState([]);
    const [items, setItems] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const { loading, data: orders } = useFetch({ url: "/api/order" });

    const { data: session } = useSession();

    const productIds = useMemo(() => {
        if (!orders || orders.length < 1) return [];
        const productIds = orders.reduce((productIds, order) => {
            const filteredItems = order.items.filter(item => productIds.includes(item.productId) === false);
            return [...productIds, ...filteredItems.map(item => item.productId)]
        }, []);
        console.log("productIds: ", productIds);
        return productIds;
    }, [orders]);

    useEffect(() => {
        if (!productIds || productIds.length < 1) return;
        const query = `*[_type == "product" && slug.current in ["${productIds.join('", "')}"]]`;
        client.fetch(query)
            .then(products => setItems(products));
    }, [productIds]);

    useEffect(() => {
        if (items.length === 0) setNormalizedOrders(orders);
        else if (orders.length > 0) {
            setNormalizedOrders(orders.map(order => ({
                ...order, items: order.items.map(item => ({
                    ...item, product: items.find(i => i.slug.current === item.productId)
                }))
            })));
        }
    }, [items]);

    useEffect(() => {
        console.log("normalizedOrders: ", normalizedOrders);
    }, [normalizedOrders]);

    return (
        <div className="main scrollbar-hide">
            <section className="section">
                <div className="section-layout md:flex-col lg:flex-row">
                    <div className="article profile-layout sm:min-w-320 md:min-w-410 sm:px-0">
                        <h2 className="font-h3 form-title mb-9 font-bold">My orders</h2>
                        <div className="w-full flex-y mt-5 transition-all duration-500">
                            {loading && <div className="flex-x h-56"><AiOutlineLoading size={80} className="animate-spin text-blue-500" /></div>}
                            {normalizedOrders && normalizedOrders.map(order => (
                                <div className="flex flex-col justify-start items-start w-11/12 px-2.5 mb-5" key={order.id}>
                                    <h3 className="text-white bg-gray-500 py-2 px-3 rounded-t-3xl flex justify-around w-full">
                                        <span className="px-1">
                                            Order N°{order.id.slice(-5)}
                                        </span>
                                        <span className="px-1">
                                            Date: {localeDate(order.createdAt, true)}
                                        </span>
                                    </h3>
                                    <div className="mt-2.5 md:mt-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-w-2 w-full scrollbar-thumb-blue-800 scrollbar-track-blue-200 py-5 px-2.5 border-x-2 border-b-2 border-gray-500 rounded-b-3xl">
                                        {order.items.length >= 1 && order.items.map((item) => (
                                            <div className="flex sm:gap-2 md:p-3 py-5 px-1.5" key={item.id}>
                                                <img src={urlFor(item.product?.image[0])} className="w-1/4 h-1/4 md:w-[150px] md:h-[150px] md:min-w-[150px] object-contain rounded-2xl" />
                                                <div className="sm:pl-2">
                                                    <div className="item-desc-flex flex-wrap gap-2.5">
                                                        <h5 className="whitespace-normal">{item.product?.name}</h5>
                                                    </div>
                                                    <div className="item-desc-flex mt-4 md:mt-8 sm:ml-8">
                                                        <div>
                                                            <p className="border border-gray-800 rounded-3xl flex-x px-4">
                                                                <span className="flex-x cursor-pointer h-full w-28">
                                                                    Unit Price:
                                                                </span>
                                                                <span className="flex-x w-16 h-10 cursor-pointer">
                                                                    ${item.product?.price}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="item-desc-flex mt-4 md:mt-8 sm:ml-8">
                                                        <div>
                                                            <p className="border border-gray-800 rounded-3xl flex-x px-4">
                                                                <span className="flex-x cursor-pointer h-full w-24">
                                                                    Quantity:
                                                                </span>
                                                                <span className="flex-x w-10 h-10 cursor-pointer">
                                                                    {item.quantity}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="item-desc-flex mt-4 md:mt-8 sm:ml-8">
                                                        <div>
                                                            <p className="border border-gray-800 rounded-3xl flex-x px-4">
                                                                <span className="flex-x cursor-pointer h-full w-16">
                                                                    Total:
                                                                </span>
                                                                <span className="flex-x w-20 h-10 cursor-pointer">
                                                                    ${item.product?.price * item.quantity}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Order;