
// All configurations will extend these options
// ============================================
import dotenv from "dotenv";
dotenv.config();

export const config = {
    apiName: 'Mercuri App',
    apiBaseUri: "/mercuri/api",
    env: process.env.NODE_ENV,
    corsoptions: {
        origin: process.env.CORSURL,
        methods: "GET,POST",
        allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token,x-client-secret, Authorization"
    },

    // Server port
    port: process.env.PORT || 3000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Domain (e.g. https://localhost)
    domain: process.env.DOMAIN,

    logoutExpTime: 60,

    // Lifetime for session
    expiresIn: {
        session: 1 * 60
    },
    //custom logger
    log: Boolean(process.env.LOG),
    dbDetails: {
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        dialect: process.env.DIALECT,
        DB_NAME: process.env.DB_NAME,
        CUSTOMER_DB: process.env.CUSTOMER_DB_NAME
    },

    filePath: "./public",

    aws: {
        bucketName: process.env.BUCKET_NAME
    },
    mail: {
        host: "smtp.gmail.com",
        service: 'gmail',
        auth: {
            user: "mailtest.encora@gmail.com",
            pass: "encora123"
        },
        from: "mailtest.encora@gmail.com",
        profileReview: "<p>Hello Team,</p> <p>You have one profile to be reviewed with details as follows:</p> <p>Partner Name : {{partnerName}}</p> <p>Address: {{address1}}</p> <p>Website: {{website}}</p> <p>Email: {{email}}</p> <p>Phone: {{phone}}</p> <p>Please review and activate profile</p> <p>Thanks &amp; Regards</p> <p>Mercuri Team</p> <p>&nbsp;</p>",
        profileReviewSub: "Profile Review"
    },

    token: {
        options: {
            expiresIn: 1 * 6000,
            algorithm: "HS256"
        },
        privateKey: "mercuri-secret"
    },

    authApp: {
        encKey: process.env.AUTH_ENC_KEY, // set random encryption key
        iv: process.env.AUTH_IV, // set random initialisation vector
        secretKey: process.env.AUTH_SECRET_KEY
    },

    adyen: {
        apiKey: process.env.API_KEY,
        env: "TEST",
        token: process.env.ADYEN_TOKEN,
        createAccountUrl: process.env.ADYEN_ACCOUNT_URL,
        onBoardingUrl: process.env.ADYEN_ONBOARDING_URL,
    }


};
