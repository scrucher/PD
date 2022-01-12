import "reflect-metadata";
import { DbUrl } from "./Config/DB_Config.config";
import mongoose from "mongoose";
import app, { App } from "./server";

async function Bootstrap() {
    const port = process.env.PORT || 8080
    App();
    await mongoose.connect(DbUrl, {
        autoIndex: true,
    })
        .then(() => {
            app.listen(port, () => {
                console.log(`app listen on port ${port}`);
            });
        })
        .catch(err => {
            console.log(err);
        });
}
Bootstrap();