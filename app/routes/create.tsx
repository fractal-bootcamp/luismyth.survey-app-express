
import type { ActionFunction, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import { json } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import client from "~/client";

import { prismaDatabase } from "~/prismaDatabase";


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
