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

    await client.survey.create({ /// this function will return the doc item that is created
        data: {
            name: body.name
            // name: data.get("surveyName")?.toString() || "default survey name",
            // name squiggly line if you don't have toString...because it otherwise returns a form data entry value type (specific to prisma)
        }
        })

    // if (!body.name) {
    //     return res.status(400).json({
    //         error: "survey name missing"
    //     })
    // }

    console.log("The request to POST an entry has been received, with req as:", req)

    res.json("hi")

    return(null)
})




// FOR REFERENCE - THIS WAS HOW I GOT IT WORKING WITH ACTIONFUNCTION

// export const action: ActionFunction = async ({ request }) => {
//   const data = await request.formData();

//   console.log("request.formData:", request.formData)

//   const confirmedNewSurvey = await client.survey.create({ /// this function will return the doc item that is created
//     data: {
//       name: data.get("surveyName")?.toString() || "default survey name",
//       // name squiggly line if you don't have toString...because it otherwise returns a form data entry value type (specific to prisma)
//     }
//   })

//   return redirect(`/survey/${confirmedNewSurvey.id}`)
// }


// nothing happens until you set it to listen

app.listen(expressPort, () => {
    console.log("Server is running on port", expressPort)
})