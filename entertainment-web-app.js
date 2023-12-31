const fireBaseAccountDetails = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_KEY_ID,
    private_key: `-----BEGIN PRIVATE KEY-----\n${process.env.FIREBASE_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`,
    client_email: `${process.env.FIREBASE_CLIENT_EMAIL}`,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: process.env.FIREBASE_TOKEN_URL,
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CERT_URL,
    universe_domain: "googleapis.com"
}

export default fireBaseAccountDetails