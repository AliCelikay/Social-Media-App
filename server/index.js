import express from "express";
const app = express();

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import cookieParser from "cookie-parser";
import cors from "cors";


//middlewares
// this code function is needed because we are using 'withCredentials: true' in login context in authContext.js, sending credentials/cookies to client side
app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Credentials", true)
    next();
})
// allows us to send json object from user input
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

app.listen(8800, ()=> {
    console.log("API Working")
})
