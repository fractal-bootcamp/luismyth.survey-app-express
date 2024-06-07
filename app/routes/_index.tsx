import { PrismaClient } from "@prisma/client";

const prismaDatabase = new PrismaClient()

console.log("feailkmcewio")

import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  console.log("LOADER CALLED")
  return json(
    await prismaDatabase.survey.findMany()
  )
}

export function HowManySurveys() {
  const surveys = useLoaderData<typeof loader>();
  return (
    <div>
      <p>The Loader has found {surveys.length} surveys are recorded</p>
    </div>
  )
}


export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <HowManySurveys />
    </div>
  );
}


// import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";

// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };


// export const loader: LoaderFunction = async () => {
//   // return {message: "Welcome to Remix!" };
//   return {survey: surveys};
// };


// // OPTIONAL

// enum SurveyFormFields {
//   SurveyName = "surveyName",
//   QuestionOne = "questionOne"
// }

// //and then later summon these using SurveyFormFields.SurveyName


// export const action: ActionFunction = async ({ request }) => {
//   const data = await request.formData();
//   // console.log(data.get("surveyName"
//   await clientInformation.survey.create({
//     data.get("surveyName")?.toString || "default survey name",
//   })

//   //Updating data structure
//   surveys.push({
//     // id: surveys.length + "1"
//     // lol this willliterally just add it all as 
//     title: data.typed(surveyName).toString       /// unsure if I got this right, and there's more
//     })
//   ))


// }
