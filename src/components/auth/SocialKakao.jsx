import React from "react"

export const SocialKakao = () => {
    const Rest_api_key = 'REST API KEY' //REST API KEY
    const redirect_uri = 'https://spring-hotel-booking-website-front-git-master-yeoouls-projects.vercel.app/' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
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

