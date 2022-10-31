import React, { useState } from 'react';
import { Input, LoadingButton } from "../UI";
import { ReviewScore } from ".";
import { useDispatch } from 'react-redux';
import { addAlert } from '../../store/actions';
import { required, vreview } from '../../utils/validate';
import { formatError } from '../../utils';

const ReviewForm = ({ product, onSent }) => {
    const [value, setValue] = useState();
    const [reset, setReset] = useState(false);
    const [focus, setFocus] = useState(false);
    const [send, setSend] = useState(false);
    const [score, setScore] = useState(0);
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (value) => {
        setValue(value);
        setFocus(true);
        setError(false);
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

    const handleSubmit = () => {
        setFocus(false);
        setSend(true);
    }

    const handleNewScore = (score) => {
        setScore(score);
    }

    const handleError = () => setError(true);

    const submitData = async (e) => {
        e.preventDefault();
        if (error || score < 1 || loading) return
        setLoading(true);
        try {
            const body = { productId: product._id, comment: value, score };
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            handleComplete();
            onSent(data);
            dispatch(addAlert({ type: "success", message: `You've successfully reviewed the product` }));
            setLoading(false);
        } catch (error) {
            dispatch(addAlert({ type: "error", message: formatError(error) }));
            setLoading(false);
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
                        validators={[required, vreview]}
                        onError={handleError}
                    />
                    <div className={`ml-2`}>
                        <LoadingButton
                            loading={loading}
                            disabled={loading}
                            className="btn-red-outline"
                        >
                            Post
                        </LoadingButton>
                    </div>
                </div>
            </div>
        </form>
    )
};

export default ReviewForm;
