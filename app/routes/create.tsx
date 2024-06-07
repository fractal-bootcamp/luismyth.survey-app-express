
import type { ActionFunction, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import { json } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import client from "~/client";

import { prismaDatabase } from "~/prismaDatabase";


export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();

  console.log("request.formData:", request.formData)

  await client.survey.create({
    data: {
      name: data.get("surveyName") || "default survey name",
    }
  })


  return redirect(`/survey/1`)

  // const formData = await request.formData();
  // const survey = await createSurvey(formData);

  // const newSurveyId = ?!?

  // return redirect(`/survey/${client.survey.newSurveyId}`)


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
              defaultValue={actionData?.values.name} 
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




// MAY NEED SOME INSPIRATION FROM THIS STILL
// }
// function createSurvey(formData: object) {
  //   console.log(formData)
  // }
  

// export const loader = async ({
//   params,
// }: LoaderFunctionArgs) => {
//   const surveyId = params.surveyId;

//   return json( {surveyId});
//
// export const action = async ({
//   request,
// }: ActionFunctionArgs) => {
//   const formData = await request.formData();
//   const survey = await createSurvey(formData);
//   return redirect(`/survey/${survey.id}`)
  
// }