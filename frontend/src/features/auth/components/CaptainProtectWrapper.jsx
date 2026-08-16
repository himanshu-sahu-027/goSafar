import { Navigate } from "react-router-dom";

import useCaptainAuth from "../hooks/useCaptainAuth";

function CaptainProtectWrapper({ children }) {
    const {
        captain,
        authChecked,
    } = useCaptainAuth();

    if (!authChecked) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (!captain) {
        return (
            <Navigate
                to="/captain-login"
                replace
            />
        );
    }

    return children;
}

export default CaptainProtectWrapper;