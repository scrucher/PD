export const DbUrl = process.env.MONGODB_URI ||'mongodb+srv://scrucher:HbL24muwDi5jr5w@cluster0.vps4s.mongodb.net/food-delivery-db?retryWrites=true&w=majority'
    console.log(process.env.MONGODB_URI)
export const DbConnectionOptions = {
    autoIndex: true,
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