import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/ApiFunctions"; // 이미 정의된 axios 인스턴스 사용
import { useAuth } from "./AuthProvider";

const modalBackdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
};

function SocialGooglCallback() {
    const navigate = useNavigate(); //navigate를 사용하여 홈 페이지로 리다이렉트S
    const auth = useAuth();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search); //쿼리스트링으로 인증코드 가져옴
        const code = urlParams.get("code");

        if (code) {
            // 백엔드로 Authorization Code 전송
            const exchangeCodeForToken = async () => {
                try {
                    const response = await api.post("/auth/google/callback", { code });
                    const { token } = response.data;
                    auth.handleLogin(token);  // 받은 토큰으로 로그인 처리
                    navigate("/", { replace: true });  // 리다이렉트
                } catch (error) {
                    console.error("Failed to exchange code for token", error);
                    // 오류 처리 (예: 사용자에게 오류 메시지 표시)
                }
            };
            exchangeCodeForToken();
        } else {
            console.error("Authorization code not found");
        }
    }, [navigate, auth]); //의존성 배열 (navigate와 auth를 포함시킨 것은 이 값들이 변경될 때마다 useEffect 훅이 실행)

    return (
        <>
            {showModal && (
                <div style={modalBackdropStyle}>
                    <div style={modalContentStyle}>
                        <h2>Logging in...</h2>
                        <p>Please wait while we log you in.</p>
                    </div>
                </div>
            )}
        </>
    );

}

export default SocialGoogleCallback;

