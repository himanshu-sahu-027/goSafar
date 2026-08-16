import { useEffect } from "react";

import useCaptainAuth from "../hooks/useCaptainAuth";

function CaptainAuthInitializer({ children }) {
    const {
        captain,
        authChecked,
        fetchCaptainProfile,
    } = useCaptainAuth();

    useEffect(() => {
        if (!authChecked && !captain) {
            fetchCaptainProfile();
        }
    }, [
        authChecked,
        captain,
        fetchCaptainProfile,
    ]);

    return children;
}

export default CaptainAuthInitializer;