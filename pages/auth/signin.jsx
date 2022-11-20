import React, { useEffect, useState, useMemo } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { TiSocialGithub } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc"
import { useDispatch } from "react-redux";
import { addAlert } from "../../store/actions";
import { useRouter } from "next/router";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from "next/link";
import { ErrorContext } from "../../context";
import { Register, Login } from "../../components/Form";

export default function Signin({ providers }) {
    const [noAccount, setNoAccount] = useState(false);
    const [checked, setChecked] = useState(true);
    const [labelClass, setLabelClass] = useState("border-transparent");


    const router = useRouter();
    const { query } = router;
    const { data: session } = useSession();
    const dispatch = useDispatch();


    const errorLabel = useMemo(() => "text-red-500 border-red-300", []);
    const oauthProviders = useMemo(() => {
        return Object.values(providers).filter(provider => provider.name !== "credentials" && provider.name !== "Google");
    }, [providers]);

    const toggleConnexion = () => { setNoAccount(!noAccount) }


    useEffect(() => {
        if (query.error)
            dispatch(addAlert({ type: "error", message: query.error }));
        if (session && query.callbackUrl)
            router.push(query.callbackUrl);
    }, [session, query]);

    const handleChange = (event) => {
        setLabelClass("border-transparent");
        setChecked(event.target.checked);
    };

    const handleClick = (id) => {
        if (checked)
            signIn(id);
        else
            setLabelClass(errorLabel);

    }

    return (
        <>
            <div className="flex-y my-auto min-h-[60vh] divide-y-2 divide-gray-400 gap-2">
                <div className="flex-y">
                    <h3 className="text-blue-900 mb-2 font-h3 text-2xl">Github Login</h3>
                    {oauthProviders.map((provider) => {
                        return (
                            <LoginButton key={provider.name} provider={provider} onClick={handleClick} />
                        )
                    })}
                </div>
                <div className="flex-y pt-5">
                    <h3 className="text-blue-900 mb-2 font-h3 text-2xl">Username / Password {noAccount ? "Sign Up" : "Login"}</h3>
                    {noAccount ? (
                        <ErrorContext errors={["name", "username", "password", "samePassword"]}>
                            <Register checked={checked} />
                        </ErrorContext>
                    ) : (
                        <ErrorContext errors={["username", "password"]}>
                            <Login checked={checked} />
                        </ErrorContext>
                    )}
                </div>

                <div className="sm:mt-2">
                    {noAccount && (
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    id="terms"
                                />}
                                label={<React.Fragment>
                                    <p className={`border-2 rounded-xl px-1 text-xs sm:text-sm ${labelClass}`}>
                                        I accept Instashop's <Link href="/terms"><span className="link">Terms of Use</span></Link> and <Link href="/policy"><span className="link">Privacy Policy</span></Link>
                                    </p>
                                </React.Fragment>}
                            />
                        </FormGroup>
                    )}
                    {noAccount ? (
                        <div className="flex-x text-xs sm:text-sm">
                            <span>Already registered? </span>
                            <button className="ml-1 text-blue-600" onClick={toggleConnexion}>Sign in here</button>
                        </div>
                    ) : (
                        <div className="flex-x  text-xs sm:text-sm">
                            <span>No account yet? </span>
                            <button className="ml-1 text-blue-600" onClick={toggleConnexion}>Register here</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

const LoginButton = ({ provider, onClick }) => {

    return (
        provider.name === "Google" ?
            <button className="login-btn group border border-google hover:border-google-dark bg-google hover:bg-google-dark" onClick={() => onClick(provider.id)}>
                <FcGoogle size={28} className="login-icon google-icon bg-white p-[8dp] group-hover:bg-gray-100" />
                <span className="w-full roboto">Sign in with {provider.name}</span>
            </button>
            :
            <button className="login-btn login-github group" onClick={() => onClick(provider.id)}>
                <TiSocialGithub size={28} className="login-icon github-icon" />
                <span className="w-full roboto">Sign in with {provider.name}</span>
            </button>
    )
}


export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}