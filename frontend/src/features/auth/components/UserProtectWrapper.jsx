import { Navigate } from "react-router-dom";

import useUserAuth from "../hooks/useUserAuth";

function UserProtectWrapper({ children }) {
    const {
        user,
        authChecked,
    } = useUserAuth();

    if (!authChecked) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/user-login" replace />;
    }

    return children;
}

export default UserProtectWrapper;