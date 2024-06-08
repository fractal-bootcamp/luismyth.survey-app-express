import express from "express";

const app = express();

// send a 

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message:"Hello World"});
})



