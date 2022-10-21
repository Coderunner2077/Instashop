import React, { useMemo, useCallback, useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";


const ReviewScore = ({ score: defaultScore, id, htmlId, total, onChange }) => {
    const [score, setScore] = useState(defaultScore);

    const handleClick = (score) => {
        console.log("new score is: ", score);
        setScore(score);
        if (isOwner) onChange(score);
    }

    const isOwner = useMemo(() => {
        return total === undefined && !!id && onChange !== undefined;
    }, [total, id, onChange]);

    const stars = useMemo(() => {
        let stars = [];
        for (let i = 0; i < score; i++)
            stars.push(i)
        return <>{stars.map((star, i) => <FaStar key={`${id}-star-${i}`} className={`${isOwner ? "transition-all duration-200 hover:scale-110" : ""}`} onClick={() => handleClick(star + 1)} />)}</>;
    }, [score]);

    const halfStar = useMemo(() => (
        score % Math.floor(score) > 0 ? <FaStarHalfAlt /> : ""
    ), [score]);

    const emptyStars = useMemo(() => {
        let emptyStars = [];
        for (let i = Math.floor(score); i < 5; i++)
            emptyStars.push(i);
        console.log("emptyStars", emptyStars);
        return <>{emptyStars.map((star, i) => <FaRegStar key={`${id}-emptystar-${i}`} className={`${isOwner ? "transition-all duration-200  hover:scale-110" : ""}`} onClick={() => handleClick(star + 1)} />)}</>;
    }, [score])

    const content = useMemo(() => (
        <div className="space-x-0.5 text-red-600 flex items-center">
            {stars}{halfStar}{emptyStars}
            {total !== undefined && !id && (
                <p className="text-black">
                    ({`${total}`})
                </p>
            )}
            {isOwner && (
                <p className="relative ml-2 text-sky-700 font-bold text-lg cursor-default">
                    Your score
                </p>
            )}
        </div>
    ), [score, isOwner]);

    return htmlId ? (
        <a href={`#${htmlId}`} className="cursor-pointer">
            {content}
        </a>
    ) :
        <div className="cursor-pointer">
            {content}
        </div>
};

export default ReviewScore;