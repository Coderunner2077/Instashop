import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { AvatarContext } from "../../context/AvatarContext";
import { EditUsername, EditAvatar, EditEmail } from "../../components/Form";
import { SubmitBtn } from "../../components/UI";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { showModal, hideModal } from "../../store/actions";
import { reloadSession } from "../../utils";

function Profile() {
    const [usernameChanged, setUsernameChanged] = useState(false);
    const [username, setUsername] = useState("");
    const [avatarSrc, setAvatarSrc] = useState("");
    const [email, setEmail] = useState("");
    const mainRef = useRef(null);
    const router = useRouter();
    const dispatch = useDispatch();

    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            setAvatarSrc(session.user.image);
            setUsername(session.user.name);
            setEmail(session.user.email);
            if (!mainRef.current) return;
            mainRef.current.scrollTo(0, 0);
        }
    }, [session]);

    const handleAvatarSaved = (user) => {
        reloadSession();
        setAvatarSrc(user ? user.image : null);
    };

    const handleUsernameSaved = (username) => {
        setUsername(username);
        setUsernameChanged(false);
    };

    const handleUsernameChanged = (bool) => {
        setUsernameChanged(bool);
    };


    const handleEmailSaved = (email) => {
        setEmail(email);
    }

    const handleProfileDeleted = (id) => {
        dispatch(hideModal());
        reloadSession();
        router.push("/")
    }

    const confirmDelete = () => {
        dispatch(showModal({
            title: "Are you sure you want to delete your profile?", body: (
                <div className="flex-x gap-3">
                    <button className="button btn-primary" onClick={() => dispatch(hideModal())}>
                        Cancel
                    </button>
                    <SubmitBtn url="/api/profile" method="delete"
                        onSuccess={handleProfileDeleted}
                        message="You've successfully deleted your account, good bye :-("
                    >
                        Delete
                    </SubmitBtn>
                </div>
            )
        }))
    }

    return (
        <div className="main scrollbar-hide" ref={mainRef}>
            <section className="section">
                <div className="section-layout md:flex-col lg:flex-row">
                    <div className="article profile-layout sm:min-w-320 md:min-w-410 sm:px-0">
                        <h2 className="font-h3 form-title mb-9 font-bold">Public Profile</h2>
                        <div className="form-layout mb-2">
                            <AvatarContext.Provider value={{ avatar: avatarSrc, updateAvatar: handleAvatarSaved }}>
                                <EditAvatar />
                            </AvatarContext.Provider>
                            <div className="grid grid-cols-1 gap-6">
                                <EditUsername defaultUsername={username} onChange={handleUsernameChanged} onSave={handleUsernameSaved} />
                                <EditEmail defaultEmail={email} onSave={handleEmailSaved} />
                            </div>
                        </div>
                        <fieldset className="fieldset profile w-3/5">
                            <legend className="ml-3 text-left">Profile Deletion</legend>
                            <div className="flex-x">
                                <button onClick={confirmDelete} className="button btn-red">
                                    Delete Profile
                                </button>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Profile;