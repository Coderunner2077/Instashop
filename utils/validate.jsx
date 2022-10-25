import validator from "validator";

export const required = (value) => {
    const isEmpty = typeof value === "string" ? validator.isEmpty(value) : value === 0;
    if (isEmpty) {
        return (
            <span className="inline-block" role="alert">
                This field is required
            </span>
        );
    }
};

export const vreview = (value) => {
    if ((value && value.trim().length > 0) && value.trim().length < 15)
        return (
            <span className="inline-block" role="alert">
                {"Too short < 15"}
            </span>
        );
    else if (value.trim().length > 150)
        return (
            <span className="inline-block" role="alert">
                {"Too long > 150"}
            </span>
        );
};