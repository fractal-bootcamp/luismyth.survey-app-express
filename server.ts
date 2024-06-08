import express, { RequestHandler } from "express";
import client from "~/client";

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

// nothing happens until you set it to listen

app.listen(4000, () => {
    console.log("Server is running on port 4000")
})