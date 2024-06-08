import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, json } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";


import { useEffect, useState } from "react";
import { prismaDatabase } from "~/prismaDatabase";



export const getSurveys = async () => {
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


type Surveys = {
  name: string;
  id: number;
}[]


function HowManySurveys({ surveysLength }: any ) {
  return (
    <div>
      <p>The Loader has found {surveysLength} surveys are recorded</p>
    </div>
  )
}

export default function Index() {
  const [surveys, setSurveys] = useState<Surveys>([])

  useEffect(
    () => {

      const loadData = async () => {
        const data = await getSurveys();
        setSurveys(data.surveys);
      };
      loadData()
    }, [])

  console.log("Client side is live.")
  console.log("surveys is:", surveys)

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Survey Orangutan</h1>
      <HowManySurveys surveysLength = {surveys.length} />

      {surveys.toReversed().map((survey) => (
        <div key = {survey.id}>
          <p> {survey.name}</p>
        </div>
      ))}

      {/* <div>
      <Link to="/create" >Create</Link>
      </div>
      <HowManySurveys />
      <ListSurveys /> */}
    </div>
  );
}















// enum SurveyFormFields {
//   SurveyName = "surveyName",
//   QuestionOne = "questionOne",
// }

// export const meta: MetaFunction = () => {
//   return [
//     {title: "Juicy new app"},
//     { name: "description", content: "Welcome to the new version of the website"}
//   ]
// }








// export const loader = async ({
//   params,
// }: LoaderFunctionArgs) => {
//   console.log("server side")
//   return json(
//     await prismaDatabase.survey.findMany()
//   )
// }



// function ListSurveys() {
//   const data = useLoaderData<typeof loader>();
//   const x = [1, 2, 3];
//   console.log(data);
//   return(
//     <ul>
//       {data.toReversed().map((survey) => (
//           <li key={survey.id}>
//             <Link to={`/survey/${survey.id}`}>
//               {survey.name}
//             </Link>
//           </li>
//       ))}
//     </ul>
//   )
// }

// /// Test Comment


