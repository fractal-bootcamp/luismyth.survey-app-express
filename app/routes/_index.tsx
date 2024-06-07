import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, json } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

import { prismaDatabase } from "~/prismaDatabase";


export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  console.log("server side")
  return json(
    await prismaDatabase.survey.findMany()
  )
}

function HowManySurveys() {
  const surveys = useLoaderData<typeof loader>();
  return (
    <div>
      <p>The Loader has found {surveys.length} surveys are recorded</p>
    </div>
  )
}

function ListSurveys() {
  const data = useLoaderData<typeof loader>();
  return(
    <ul>
      {data.toReversed().map((survey) => (
          <li key={survey.id}>
            <Link to={`/survey/${survey.id}`}>
              {survey.name}
            </Link>
          </li>
      ))}
    </ul>
  )
}





export default function Index() {
  console.log("client side")
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div>

      <h1>Welcome to Survey Gibbon</h1>
      <Link to="/create" >Create</Link>
      </div>
      <HowManySurveys />
      <ListSurveys />
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
