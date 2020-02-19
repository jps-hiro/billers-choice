const PROXY_CONFIG = [
    {
        context: [
            "/api",
        ],
        target: "https://bridgewing.net",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
