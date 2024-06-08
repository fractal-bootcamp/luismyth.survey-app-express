import express, { RequestHandler } from "express";
import client from "~/client";

const app = express();

// send a request request.body = 

app.use(express.json());

const rootRouteHandler: RequestHandler = (req, res) => {

    const surveys = await client.survey.getMany()

    res.json({message:"Hello World"}); // if you have a response, return a json object
}

app.get("/", rootRouteHandler)

app.get("/")



///nothing happens yet because you haven't set it to listen

app.listen(4000, () => {
    console.log("Server is running on port 4000")
})