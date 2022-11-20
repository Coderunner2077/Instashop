import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MuiTextField } from ".";
import { required, vusername, vname, vpassword, vrepeatpassword } from "../../utils/validate";
import { LoadingButton } from '@mui/lab';
import { useDispatch } from "react-redux";
import { addAlert } from "../../store/actions";
import { useErrorContext } from "../../context";
import { signIn } from "next-auth/react";
import { formatError } from "../../utils";
import http from "../../lib/http";

const Register = ({ checked }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [samePassword, setSamePassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const { callbackUrl } = router.query;

    const { valid, useErrorCallbacks } = useErrorContext();
    const { nameError, usernameError, passwordError, samePasswordError } = useErrorCallbacks();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await http.post("/api/auth/signup", { name, username, password }, { withCredentials: true })
            signIn("credentials", { username, password, callbackUrl: callbackUrl ?? `${window.location.origin}`, redirect: false })
                .then((res) => {
                    setIsLoading(false);
                    if (res.status === 200)
                        setRedirect(true);
                    else
                        dispatch(addAlert({ type: "warning", message: formatError(res) }));

                })
                .catch(err => {
                    dispatch(addAlert({ type: "error", message: formatError(err) }));
                    setIsLoading(false);
                });

        } catch (err) {
            dispatch(addAlert({ type: "error", message: formatError(err) }));
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (redirect)
            router.push(callbackUrl ?? "/profile");
    }, [redirect]);

    return (
        <form className="flex-y w-full sm:w-52 gap-4" onSubmit={handleSubmit}>
            <MuiTextField onChange={(value) => setName(value)}
                validators={[required, vname]} label="Display Name" onError={nameError}
            />
            <MuiTextField type="username" onChange={(value) => setUsername(value)}
                validators={[required, vusername]} label="Username" onError={usernameError}
            />
            <MuiTextField type="password" onChange={(value) => setPassword(value)}
                validators={[required, vpassword]} label="Password" onError={passwordError} reset={isReset}
            />
            <MuiTextField type="password" onChange={(value) => setSamePassword(value)} checkValue={password}
                validators={[required, vrepeatpassword]} label="Repeat Password" onError={samePasswordError} reset={isReset}
            />
            <div className="">
                <LoadingButton type="submit" variant="outlined" color="primary" disabled={!checked || !valid}
                    loading={isLoading}
                >
                    Signup
                </LoadingButton>
            </div>
        </form>
    );
};

export default Register;