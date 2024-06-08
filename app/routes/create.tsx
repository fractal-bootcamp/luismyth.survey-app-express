
import type { ActionFunction, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import client from "~/client";

import { expressPort, getSurveys } from "./_index";


const surveys = await getSurveys();

console.log("From create.tsx, surveys looks like...", surveys)


export const postSurvey = async ({ name }: NewSurvey) => {
  const response = await fetch (`http://localhost:${expressPort}/insert`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
  }
)

console.log("response AAA is:", response)
console.log(typeof response);

const responseJson = await response.json()
;
// console.log("response JSON is:", responseJson);


}



type NewSurvey = {
  name: string;
}









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



export default function CreateSurveyForm () {
  const actionData = null
  return (
    <div>
      <button onClick={() => postSurvey({name:"ha"})} > acjioew nemwoa</button>
      
    </div>
  )
}
