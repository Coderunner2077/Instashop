import { data } from 'autoprefixer';
import React, { useState } from 'react';
import { Input, ReviewScore } from ".";

const ReviewForm = ({ product, onSent }) => {
    const [value, setValue] = useState();
    const [reset, setReset] = useState(false);
    const [focus, setFocus] = useState(true);
    const [send, setSend] = useState(false);
    const [score, setScore] = useState(0);

    const handleChange = (value) => {
        setValue(value);
        setFocus(true);
    };

    const handleComplete = () => {
        setValue("");
        setReset(!reset);
        setFocus(true);
        setSend(false);
    };

    const onEnter = (value) => {
        if (value && value.trim())
            handleSubmit(value);
    }

    const handleSubmit = (e) => {
        setFocus(false);
        setSend(true);
        if (onSent) onSent(value);
    }

    const handleNewScore = (score) => {
        setScore(score);
    }

    const submitData = async (e) => {
        e.preventDefault();
        try {
            const body = { productId: product._id, comment: value, score };
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            console.log("created review: ", data);
        } catch (error) {
            console.error("submit error", error);
        }
    };

    return (
        <form className="w-full h-1/5 gap-1 sm:gap-10" onSubmit={submitData}>
            <div className="flex flex-col justify-start items-start">
                <ReviewScore score={score} id={product._id} onChange={handleNewScore} />
                <div className="flex mt-2">
                    <Input
                        initValue={value}
                        id={"message-form"}
                        label={undefined}
                        onChange={handleChange}
                        reset={reset}
                        textarea={true}
                        onEnter={onEnter}
                        focus={focus}
                        placeholder="Your review"
                        className="w-fit sm:w-72"
                    />
                    <div className={`ml-2`} type="submit">
                        <button className="btn btn-red-outline">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
};

export default ReviewForm;
