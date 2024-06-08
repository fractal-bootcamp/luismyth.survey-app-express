import express, { RequestHandler } from "express";
import client from "~/client";
import { expressPort } from "~/routes/_index";

console.log("####################### \n SERVER RESTARTED \n ####################### ")

const app = express();

app.use(express.json());

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


// send a request request.body = '{"name": "John"}' -> {name: "John"}

app.post("/insert", async (req, res) => {
    const body = {
        name: req.body.name
    }

    await client.survey.create({ /// this function will return the doc item that is created
        data: {
            name: body.name
            // name: data.get("surveyName")?.toString() || "default survey name",
            // name squiggly line if you don't have toString...because it otherwise returns a form data entry value type (specific to prisma)
        }
        })

    if (!body.name) {
        return res.status(400).json({
            error: "survey name missing"
        })
    }

    res.send(req.body)
    // this has similarities with 'return'...so a return after this would not be called
})


// nothing happens until you set it to listen

app.listen(expressPort, () => {
    console.log("Server is running on port", expressPort)
})