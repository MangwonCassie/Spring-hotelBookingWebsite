const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "https://river-hotel-91f9caaa3277.herokuapp.com",
            changeOrigin: true,

        })
    );
};

//     withCredentials: true,  // 자격 증명을 요청에 포함