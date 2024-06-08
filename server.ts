import express, { RequestHandler } from "express";
import client from "~/client";
import { expressPort } from "~/routes/_index";

const app = express();

// send a request request.body = '{"name": "John"}' -> {name: "John"}

//bun.sh
app.use(express.json());

// cors

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});


app.get("/", async (req, res) => {
    const surveys = await client.survey.findMany();
    res.json({ surveys });
});

app.post ("/insert", async(req, res) =>{
    // I believe this this will be called by hitting localhost:4000/insert
    const body = {
        name: req.body.name
    }

    // if (!body.name) {
    //     return res.status(400).json({
    //         error: "survey name missing"
    //     })
    // }

    console.log("The request to POST an entry has been received")

    res.json("hi")

    return(null)
})



// nothing happens until you set it to listen

app.listen(expressPort, () => {
    console.log("Server is running on port", expressPort)
})