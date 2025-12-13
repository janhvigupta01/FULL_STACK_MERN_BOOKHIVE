import express  from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/conectDB.js";
import userRouter from "./routes/UserRouter.js";
import cookieParser from "cookie-parser"
import cors from "cors";
import authRouter from "./routes/authRoute.js";
const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))

dotenv.config();

app.get("/",(req,res)=>{
    res.send("server is runnig");
})

let PORT = process.env.PORT;
app.use("/api/auth", authRouter);
app.use("/api/user/",userRouter)

app.listen(PORT,()=>{
    connectDb();
    console.log(`server is running on this PORTt : ${PORT}`);
})
