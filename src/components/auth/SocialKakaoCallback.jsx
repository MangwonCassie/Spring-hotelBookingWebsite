// SocialKakaoCallback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/ApiFunctions'; // Axios 인스턴스
import { useAuth } from '../auth/AuthProvider'; // 인증 관련 컨텍스트

const SocialKakaoCallback = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            const exchangeCodeForToken = async () => {
                try {
                    // 카카오에서 받은 인증 코드를 백엔드로 전송
                    const response = await api.post('/login/kakao', { token: code });
                    const { jwt } = response.data;

                    // JWT 토큰을 로컬 스토리지에 저장 (또는 상태 관리) + S사용자 ID를 로컬 스토리지에 저장
                    localStorage.setItem("token", jwt);
                    localStorage.setItem("userId", userId);

                    // 로그인 후 홈 페이지로 리다이렉트
                    navigate("/", { replace: true });
                } catch (error) {
                    console.error("Failed to exchange code for token", error);
                }
            };
            exchangeCodeForToken();

        } else {
            console.error('Authorization code not found');
        }
    }, [navigate, auth]);

    return <p>Logging in...</p>;
};

export default SocialKakaoCallback;
