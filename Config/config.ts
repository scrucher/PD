export const DbUrl = process.env.MONGODB_URI ||'mongodb+srv://scrucher:dark@life@2014@cluster0.vps4s.mongodb.net/food-delivery-db?retryWrites=true&w=majority'
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