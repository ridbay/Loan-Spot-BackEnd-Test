/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  ENVIRONMENT: process.env.SERVER,

  DB: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  KEY: {
    secretKey: process.env.SECRETKEY,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    cloudinary_api_key: process.env.CLOUDINARY_APIKEY,
    cloudinary_secret_key: process.env.CLOUDINARY_APISECRET,
    payscribe: process.env.PAYSCRIBE,
    nuban: process.env.MONNIFY_NUBAN,
    monnify: process.env.MONNIFY_KEY,
    flutterwave: process.env.FLUTTERWAVE,
    rootshive: process.env.ROOTSHIVE,
    collect_africa: process.env.COLLECT_AFRICA,
    collect_africa_pin: process.env.COLLECT_AFRICA_PIN,
    one_signal_app_id: process.env.ONE_SIGNAL_APP_ID,
    one_signal_auth: process.env.ONE_SIGNAL_AUTH,
    paystack: process.env.PAYSTACK,
    mailgun: process.env.MAILGUN_KEY,
  },
};
//giftcard auth is depreciated and should be removed after the paycard uses bcrypt
