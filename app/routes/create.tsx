import { expressPort, getSurveys } from "./_index";
import { useState } from "react";

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
console.log("response JSON is:", responseJson);

}


type NewSurvey = {
  name: string;
}


export default function CreateSurveyForm () {
  const [submittedValue, setSubmittedValue] = useState("")
  return (
    <div>
    <input type="text" value = {submittedValue} onChange={(e) => {setSubmittedValue(e.target.value)}}/>

    <button type="submit" onClick={
      ()=>{
        console.log("Submit button has been clicked, with value:", submittedValue);
        postSurvey({name: submittedValue})
      }
    }
    >
      Submit
    </button>

      
    </div>
  )
}
