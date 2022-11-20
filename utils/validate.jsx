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

export const isEmail = (value) => {
    if (!validator.isEmail(value))
        return (
            <span className="inline-block" role="alert">
                Valid email required
            </span>
        );
};

export const vname = (value) => {
    if (value && value.trim().length < 3)
        return (
            <span className="inline-block" role="alert">
                {"Too short < 3"}
            </span>
        );
    else if (value.trim().length > 20)
        return (
            <span className="inline-block" role="alert">
                {"Too long > 20"}
            </span>
        );
};

export const vusername = (value) => {
    if (value && value.trim().match(/\s/))
        return (
            <span className="inline-block" role="alert">
                Contains whitespace
            </span>
        );
    else if (value && value.trim().length < 6)
        return (
            <span className="inline-block" role="alert">
                {"Too short < 6"}
            </span>
        );
    else if (value.trim().length > 20)
        return (
            <span className="inline-block" role="alert">
                {"Too long > 20"}
            </span>
        );
};


export const vpassword = (value) => {
    if (value && value.trim().length < 6)
        return (
            <span className="inline-block" role="alert">
                {"Too short < 6"}
            </span>
        )
    else if (value && value.length > 40)
        return (
            <span className="inline-block" role="alert">
                {"Too long > 40"}
            </span>
        );
};

export const vrepeatpassword = (value, password) => {
    if (value && value !== password)
        return (
            <span className="inline-block" role="alert">
                Passwords don't match
            </span>
        );
};