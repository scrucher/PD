import "reflect-metadata";
import { DbConnectionOptions, DbUrl } from "./Config/config";
import mongoose from "mongoose";
import app, { App } from "./server";

async function Bootstrap() {
    const port = process.env.PORT  || process.env.port || 5000;
    App();
    mongoose.Promise = global.Promise;
    await mongoose.connect(DbUrl, DbConnectionOptions )
    const connection = mongoose.connection;

    connection.once('open', ()=>{
        app.listen(port, () => {
            console.log(`app listen on  localhost:${port}`);
        });
    })
/*        .then(() => {
            app.listen(port, () => {
                console.log(`app listen on  localhost:${port}`);
            });
        })
        .catch(err => {
            console.log(err);
        });*/
}
Bootstrap();