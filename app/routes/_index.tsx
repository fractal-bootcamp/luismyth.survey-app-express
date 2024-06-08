import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, json } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

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
  const x = [1, 2, 3];
  console.log(data);
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

/// Test Comment


export const getSurveys = async () => {
  const data = await fetch ("http://localhost:4000/", {mode: "no-cors"}) // cross-resource origin sharing
  // "when I'm a website, I should only be able to interact with other websites explicitly"
  // CORS is a webscanner that prevents you from interacting with other websites
  // in this case, it might be upset that I'm interacting with different websites

  const surveys = data.json()

  return surveys
}


type Surveys = {
  name: string;
  id: number;
}[]

export default function Index() {
  const [surveys, setSurveys] = useState<Surveys>([])

  useEffect(
    () => {

      const loadData = async () => {
        const data = await getSurveys();
        setSurveys(data.surveys);
      };
      loadData()

      /// ORIGINAL METHOD
      // getSurveys().then(async (data) => {  /// .then function here is the same as doing an await
      //   const surveys = data.surveys
      //   setSurveys(surveys)
      }, [])


  

  // useEffect(()=>
  // {console.log(data),})

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
