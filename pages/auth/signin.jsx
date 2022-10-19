import React, { useEffect } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { TiSocialGooglePlus, TiSocialGithub } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { addAlert } from "../../store/actions";
import { useRouter } from "next/router";

export default function Signin({ providers }) {
    const router = useRouter();
    const { query } = router;
    const { data: session } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if (query.error)
            dispatch(addAlert({ type: "error", message: query.error }));
        if (session && query.callbackUrl)
            router.push(query.callbackUrl);
    }, [session, query]);

    return (
        <>
            <div className="flex-y my-auto min-h-[60vh]">
                <h3 className="text-blue-900 mb-4 font-h3 text-2xl">Social Login</h3>
                {Object.values(providers).map((provider) => (
                    <LoginButton key={provider.name} provider={provider} />
                ))}
            </div>
        </>
    )
}

const LoginButton = ({ provider }) => (
    provider.name === "Google" ?
        <button className="login-btn login-google group" onClick={() => signIn(provider.id)}>
            <TiSocialGooglePlus size={28} className="login-icon google-icon" />
            <span className="w-full">Sign in with {provider.name}</span>
        </button>
        :
        <button className="login-btn login-github group" onClick={() => signIn(provider.id)}>
            <TiSocialGithub size={28} className="login-icon github-icon" />
            <span className="w-full">Sign in with {provider.name}</span>
        </button>
)


export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}