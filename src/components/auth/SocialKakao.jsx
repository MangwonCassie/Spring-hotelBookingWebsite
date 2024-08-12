import React from "react"

export const SocialKakao = () => {

    const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    const Rest_api_key = 'REST API KEY' //REST API KEY
    const redirect_uri = 'https://spring-hotel-booking-website-front-git-master-yeoouls-projects.vercel.app/' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`
    const handleLogin = () => {
        window.location.href = kakaoURL
    }
    return (
        <>
            <button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }} onClick={handleLogin}>
                Kakao Login
            </button>
        </>
    )
}

