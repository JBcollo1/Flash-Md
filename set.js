const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0FoeTJRSFFTM0FLTllHbnlLa1piRFZMTndmcnY4Q0xWeTdGRFBKQmVFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibmlIVElJMEcrMmFrMC9EcDZFd3Ryb3dBTU5mdTJrOFpnUDFnVjRrMmQzZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyQitGd24vTzlNT0xwNmZZOUkyaDdLdG5CZFhnMnV2bWRibUNxdEZITW5zPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHSXVKelVQQkRYTjJVZ2VnOWc5WENNYjhwMld1bm9VUXNjWHhoSWhycERrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllCK04xRDJCdjRWYTdHVGxGZHZpcFhXVVk3NVdhNUtsYzltUXY5b0ZHRzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlA3d0FhaTh5S083bjZleUQyQ21TdTE1cWFudlQxaUlVTUMrQUwwUjRTUXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0ttWFYxaG5NL08yaElrODBLWEJuWE1SWTJtelJ3UlltWkJKR0hzaFRtcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllweFB1M1daUEVJeGF2VmVsMGFHdTdGb1dpMU42akV5MHFKRlRNMWdHWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFJcWpqOU4yVXVuTnUxNk5vYm56SGVVeEN1RVA1VjQ5WTN5S3dOZGttNjZYQWdHRHQxUURZaTA0a2xzS0FOLzhIUGhick1DQkYvd3lyOGM0aVZVRkF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NCwiYWR2U2VjcmV0S2V5IjoiTThDSEFmYXlFK0czL1oza2FjOWpJd2FJTEZPNWMvT2Z1SFpzamtmWTRYTT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiODMtT2VrZWlRemFZVjROMG5FRlFSQSIsInBob25lSWQiOiJkNDRkMzU4MS1jYWY4LTQzMWUtYjUzMS02MmRjZjEyMjllYzMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVNiQTZ6NkFKMW5XL2hpY3dsanlPNFk2TGxvPSJ9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0a2hSZy85WE0zM0ZkQVc0UmZkc2pCTUdid3M9In0sInJlZ2lzdHJhdGlvbiI6e30sImFjY291bnQiOnsiZGV0YWlscyI6IkNQeVppNDhFRU95MmlMRUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJPNUIwZTV3M05QdDYxU3plWVdZdXlLVlhuVkxFRE9xbGZZYytxU0VOSGwwPSIsImFjY291bnRTaWduYXR1cmUiOiJzOTZ2cjBabWFYenVlRnUzV0FBK1R2ZDNJbFZCT083NFFtMHliam9lcGpGblBsMG5JMlhkR3JJUGdQV0daeXhRYmorYUNqeFE3cWo2bzkvR3ZVZ3JDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQkRldXpkc2xYTklmbjlJVFd0MkUwT1VEc3lya2pOUXhROERKME5GOHNOTU5RNzBvLzRSQThtcm53Z24ycTVGcmR4L1RtWnRJWmpmWjZTVnl4STN3Qnc9PSJ9LCJtZSI6eyJpZCI6IjI1NDEwMjI1NjEyMjoxM0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJTY3l0aGXwn5Sl8J+UpSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQxMDIyNTYxMjI6MTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVHVRZEh1Y056VDdldFVzM21GbUxzaWxWNTFTeEF6cXBYMkhQcWtoRFI1ZCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxMzUxMTI4MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOYm8ifQ==
',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "scythe",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'SCYTHE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
