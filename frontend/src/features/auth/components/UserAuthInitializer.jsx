import { useEffect } from "react";

import useUserAuth from "../hooks/useUserAuth";

function UserAuthInitializer({ children }) {
    const {
        user,
        authChecked,
        fetchUserProfile,
    } = useUserAuth();

    useEffect(() => {
        if (!authChecked && !user) {
            fetchUserProfile();
        }
    }, [authChecked, user, fetchUserProfile]);

    return children;
}

export default UserAuthInitializer;