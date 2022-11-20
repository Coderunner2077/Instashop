import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MuiTextField } from ".";
import { required, vusername, vpassword } from "../../utils/validate";
import { LoadingButton } from '@mui/lab';
import { useDispatch } from "react-redux";
import { addAlert } from "../../store/actions";
import { useErrorContext } from "../../context";
import { signIn } from "next-auth/react";
import { formatError } from "../../utils";

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isReset, setIsReset] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const dispatch = useDispatch();
	const { valid, useErrorCallbacks } = useErrorContext();
	const { usernameError, passwordError } = useErrorCallbacks();
	const router = useRouter();
	const { callbackUrl } = router.query;

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		signIn("credentials", { username, password, callbackUrl: callbackUrl ?? `${window.location.origin}`, redirect: false })
			.then((res) => {
				setIsLoading(false);
				if (res.status === 200) {
					setRedirect(true);
				} else
					dispatch(addAlert({ type: "error", message: res.error === "CredentialsSignin" ? "Incorrect username and/or password" : "Unable to authenticate du to server error" }));

			})
			.catch(err => {
				dispatch(addAlert({ type: "error", message: formatError(err) }));
				setIsLoading(false);
			});
	};

	useEffect(() => {
		if (redirect)
			router.push(callbackUrl ?? "/");
	}, [redirect]);

	return (
		<form className="flex-y p-2 gap-4" onSubmit={handleSubmit}>
			<MuiTextField type="username" onChange={(value) => setUsername(value)}
				validators={[required, vusername]} label="Username" onError={usernameError}
			/>
			<MuiTextField type="password" onChange={(value) => setPassword(value)}
				validators={[required, vpassword]} label="Password" onError={passwordError} reset={isReset}
			/>
			<div className="">
				<LoadingButton type="submit" variant="outlined" color="primary" disabled={!valid}
					loading={isLoading}
				>
					Login
				</LoadingButton>
			</div>
		</form>
	);
};

export default Login;
