import React, { createContext, useContext } from "react";

const AvatarContext = createContext({ avatar: null, updateAvatar: (avatar) => { } });

const useAvatarContext = () => {
	const context = useContext(AvatarContext);
	if (!context) throw new Error("Error in creating the context");
	return context;
};
export { useAvatarContext, AvatarContext };
