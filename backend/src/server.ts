import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';
import workshopRouter from './routers/workshop.routes';


const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/art_workshop");
const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Database connection successful.")
});

const router = express.Router();
router.use("/users", userRouter);
router.use("/workshops", workshopRouter);

app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
