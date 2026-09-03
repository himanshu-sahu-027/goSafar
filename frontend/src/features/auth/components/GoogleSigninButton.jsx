import { useEffect, useRef } from "react";

function GoogleSigninButton({ onSuccess, disabled = false }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const scriptUrl = "https://accounts.google.com/gsi/client";

    const initializeGoogle = () => {
      if (!window.google || !buttonRef.current) {
        return;
      }

      buttonRef.current.innerHTML = "";

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

        // Pass the Google ID token to the parent component.
        callback: (response) => {
          if (response?.credential) {
            onSuccess(response.credential);
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: 350,
        text: "continue_with",
        shape: "rectangular",
      });
    };

    // Google Identity Services is already loaded.
    if (window.google) {
      initializeGoogle();
      return;
    }

    // Check whether another component is already loading Google.
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);

    if (existingScript) {
      existingScript.addEventListener("load", initializeGoogle);

      return () => {
        existingScript.removeEventListener("load", initializeGoogle);
      };
    }

    // Load Google Identity Services.
    const script = document.createElement("script");

    script.src = scriptUrl;
    script.async = true;
    script.defer = true;

    script.onload = initializeGoogle;

    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [onSuccess]);

  return (
    <div
      ref={buttonRef}
      className={`flex justify-center ${
        disabled ? "pointer-events-none opacity-50" : ""
      }`}
    />
  );
}

export default GoogleSigninButton;
