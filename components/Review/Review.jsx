import React, { useMemo, useRef, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { timeSince } from "../../utils";
import { ReviewScore } from ".";
import { TbTrashX } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { addAlert } from '../../store/actions';

const Review = ({ review, onDeleted }) => {
    const { data: session } = useSession();
    const scrollElRef = useRef(null);
    const dispatch = useDispatch();
    const isOwner = useMemo(() => review.reviewer.id === session.user?.id);
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
            <div ref={scrollElRef} className={`relative my-0.5 w-full flex items-center group gap-1 text-xs sm:text-sm ${isNew ? "" : "justify-start animate-slide-in-right"}`}>
                <img src={review.reviewer.image} alt={"avatar"} className="avatar" width={size} height={size} />
                <div className={`max-w-150 sm:max-w-review flex flex-col gap-1 ml-1.5 pl-1`}>
                    <div className="flex items-center gap-2">
                        <ReviewScore score={review.score} id={review.productId} />
                        <div className="relative -top-0.25 text-gray-500 opacity-0 group-hover:opacity-90 flex-x space-x-1">
                            <span>{timeSince(review.createdAt)}</span>
                        </div>
                    </div>

                    <span className="review">{review.comment}</span>
                    {isOwner && (
                        <div className="flex gap-1 items-center cursor-pointer" onClick={handleDelete}>
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
