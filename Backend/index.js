import express  from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/conectDB.js";
import userRouter from "./routes/UserRouter.js";
import cookieParser from "cookie-parser"
const app = express();
app.use(express.json())
app.use(cookieParser());

dotenv.config();

app.get("/",(req,res)=>{
    res.send("server is runnig");
})

let PORT = process.env.PORT;
app.use("/api/user/",userRouter)

app.listen(PORT,()=>{
    connectDb();
    console.log(`server is running on this PORTt : ${PORT}`);
})
