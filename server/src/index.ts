import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import { sep } from "path";
import { NotificationRouter } from "./infra/routes/notification-routes";

dotenv.config({
    path: `${__dirname}${sep}.env`
});

const app = express();
app.use(express.json());
app.use((req: Request, res: Response, next: any) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use("/notification", NotificationRouter);

app.listen(9001, () => console.log("Running server at: http://localhost:9001"));
