export const DbUrl = process.env.MONGODB_URI || "mongodb://localhost:27018/food-delivery-db"
console.log(process.env.MONGODB_URI)
export const DbConnectionOptions = {
    autoIndex: true,
    directConnection: true,
    autoCreate: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
export const MailConfig = {
    host: "",
    port: "",
    user: "",
    pass: "",
};