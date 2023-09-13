import express from "express";
import {PORT} from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routes/bookRouter.js";
import cors from "cors";
const app = express();

// Middleware for parsing JSON body
app.use(express.json());

//Middleware for handling CORS POLICY
// Option 1: Allow all origins
app.use(cors());
// Option 2: Allow custom origins
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type']
//     })
// )

app.get("/",(request,respone)=>{
    console.log(request);
    return respone.status(200).send("Hello World");
});

app.use("/books",bookRouter);


mongoose
    .connect(process.env.DATABASE_URI)
    .then(()=>{
        console.log("App connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
            }
        );
    })
    .catch((error)=>{
        console.log(error);
    });

