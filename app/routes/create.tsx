
import type { ActionFunction, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import client from "~/client";

import { getSurveys } from "./_index";


const surveys = await getSurveys();

console.log("From create.tsx, surveys looks like...", surveys)



export const postSurvey = async ({ name }: NewSurvey) => {
  const data = await fetch ("http://localhost:4000/",
    
    // {mode: "no-cors"}

  )
  // cross-resource origin sharing
  // "when I'm a website, I should only be able to interact with other websites explicitly"
  // CORS is a webscanner that prevents you from interacting with other websites
  // in this case, it might be upset that I'm interacting with different websites

  const surveys = (await data.json()) as {
    surveys: Surveys
  }

  return surveys
}



type NewSurvey = {
  name: string;
}









export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();

  console.log("request.formData:", request.formData)

  const confirmedNewSurvey = await client.survey.create({ /// this function will return the doc item that is created
    data: {
      name: data.get("surveyName")?.toString() || "default survey name",
      // name squiggly line if you don't have toString...because it otherwise returns a form data entry value type (specific to prisma)
    }
  })

  return redirect(`/survey/${confirmedNewSurvey.id}`)
}



export default function CreateSurveyForm () {
  const actionData = useActionData<typeof action>();
  return (
    <div>
      <Form method = "post" action="/create">
  
        <p>
          <label>
            Name: {" "}
            <input 
              name="surveyName" 
              type="text"
              placeholder="Enter your survey name here"
            />
          </label>
        </p>

        {actionData?.errors.name ? (
          <p style = {{ color: "red "}}>
            {actionData.errors.name}
          </p>
        ) : null }

        <p>
          <label>
            Description: {" "}
            <textarea name="description"></textarea>
          </label>
        </p>
        <p>
          <button type="submit">Create</button>
        </p>
      </Form>
    </div>
  )
}
