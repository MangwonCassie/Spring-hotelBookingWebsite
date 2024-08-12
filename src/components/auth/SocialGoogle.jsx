import React from "react"

function SocialGoogle() {

    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

    const onGoogleSocialLogin = () => {
        window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile`;
    }

    return <div>
        <div>
            <button
                type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}
                onClick={onGoogleSocialLogin}>
                Google Login
            </button>
        </div>
    </div>
}

export default SocialGoogle;