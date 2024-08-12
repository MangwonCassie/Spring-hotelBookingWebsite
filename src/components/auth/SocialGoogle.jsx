

function SocialGoogle() {
    const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

    const onKakaoSocialLogin = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
    }
    const onGoogleSocialLogin = () => {
        window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile`;
    }


    return <div className={styles.container}>
        <div className={styles.button__wrapper}>
            <button
                className={styles.button__kakao__login} onClick={onKakaoSocialLogin}>
                <img
                    className={styles.button__image}
                    src={`${process.env.PUBLIC_URL}/images/kakao_login_large_narrow.png`} />
            </button>
        </div>
        <div className={styles.button__wrapper}>
            <button
                className={styles.button__google__login} onClick={onGoogleSocialLogin}>
                구글 소셜 로그인
            </button>
        </div>
    </div>
}

export default SocialGoogle;