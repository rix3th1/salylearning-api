const DATABASE_URL = process.env.DATABASE_URL;
const password = DATABASE_URL.split(':')[2].split('@')[0];
const host = DATABASE_URL.split(':')[2].split('@')[1].split('/')[0];
const port = DATABASE_URL.split(':')[3].split('/')[0];
const database = DATABASE_URL.split(':')[3].split('/')[1];
const user = DATABASE_URL.split(':')[1].split('/')[2];

export { password, host, port, database, user };
