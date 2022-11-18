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

export default function Signin({ providers }) {
    const [checked, setChecked] = useState(true);
    const [labelClass, setLabelClass] = useState("border-transparent");


    const router = useRouter();
    const { query } = router;
    const { data: session } = useSession();
    const dispatch = useDispatch();

    const errorLabel = useMemo(() => "text-red-500 border-red-300", []);

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
            <div className="flex-y my-auto min-h-[60vh]">
                <h3 className="text-blue-900 mb-4 font-h3 text-2xl">Social Login</h3>
                {Object.values(providers).map((provider) => {
                    return (
                        <LoginButton key={provider.name} provider={provider} onClick={handleClick} />
                    )
                })}
                <div className="sm:mt-2">
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