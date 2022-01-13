export const DbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27018/flashify';
export const DbConnectionOptions = {
    directConnection: true,
    autoCreate: true,

};
export const MailConfig = {
    host: "",
    port: "",
    user: "",
    pass: "",
};