import React, { useMemo, useRef, useCallback } from 'react';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { timeSince } from "../../utils";
import { ReviewScore } from ".";
import { TbTrashX } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { addAlert } from '../../store/actions';

const Review = ({ review, onDeleted }) => {
    const { data: session } = useSession();
    const scrollElRef = useRef(null);
    const dispatch = useDispatch();
    const isOwner = useMemo(() => review.reviewer.id === session?.user?.id);
    const isNew = useMemo(() => {
        return review.createdAt > (new Date().valueOf() - 60 * 1000)
    }, [review]);

    const size = 50;

    const handleDelete = useCallback(async () => {
        try {
            const response = await fetch(`/api/review/${review.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = response.json ? await response.json() : null;

            dispatch(addAlert({ type: "success", message: `You've successfully deleted your review` }));
            onDeleted(review);
            if (response.status >= 400 && data)
                dispatch(addAlert({ type: "error", message: data.message }));
        } catch (error) {
            dispatch(addAlert({ type: "error", message: error.message || error.response?.message }));
        }
    }, [review])


    return (
        <>
            <div ref={scrollElRef} className={`relative my-0.5 w-full flex items-start group gap-1 text-xs sm:text-sm justify-start ${isNew ? "" : " animate-slide-in-right"}`}>
                <div className="h-full gap-2 mr-2">
                    <Image src={review.reviewer.image} alt={"avatar"} className="avatar" width={size} height={size} />
                </div>
                <div className={`max-w-150 sm:max-w-review flex flex-col ml-1.5 pl-1`}>
                    <div className="text-sky-700 font-bold">{review.reviewer.name}</div>
                    <div className="text-gray-500 mb-2">
                        <span>{timeSince(review.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 my-1">
                        <ReviewScore score={review.score} id={review.productId} />
                    </div>

                    <span className="review">{review.comment}</span>
                    {isOwner && (
                        <div className="flex gap-1 items-center cursor-pointer mt-1" onClick={handleDelete}>
                            <TbTrashX size={20} className="" color="red" />
                            <span className="text-red-600">Delete</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
};

export default Review;
