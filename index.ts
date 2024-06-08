import express, { RequestHandler } from "express";

const app = express();

// send a request request.body = 

app.use(express.json());

const rootRouteHandler: RequestHandler = (req, res) => {
    res.json({message:"Hello World"}); // if you have a response, return a json object
}

app.get("/", rootRouteHandler)

///nothing happens yet because you haven't set it to listen

app.listen(4000, () => {
    console.log("Server is running on port 4000")
})