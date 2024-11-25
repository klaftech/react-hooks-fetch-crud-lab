import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const baseUrl = "http://localhost:4000/questions";

function App() {
  const [page, setPage] = useState("List");

  const [questions,setQuestions] = useState([]);

  useEffect(()=>{
    fetch(baseUrl)
    .then(res => res.json())
    .then(data => setQuestions(data))
  })
  //console.log(questions)

  const RequestObjFactory = (requestObj, method) => {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestObj)
    }
  }
  
  function updateQuestions(response){
    //console.log("Response: ",response)
    setQuestions([...questions,response])
  }

  function handleQuestionDelete(id){
    //const newQuestions = questions.filter(question => question.id !== id)
    //setQuestions(newQuestions)

    fetch(baseUrl+"/"+id,RequestObjFactory({},"DELETE"))
    .then(res => console.log("Successfully Deleted ",res))
  }

  function handleQuestionUpdate(event,id){
    const selectedIndex = event.target.value
    fetch(baseUrl+"/"+id,RequestObjFactory({correctIndex: selectedIndex},"PATCH"))
    .then(res => res.json())
    .then(data => console.log(data))
  }

  
  function handleQuestionAdd(formData){
    //console.log("Form Received", formData)
    
    const questionObj = {
      prompt: formData.prompt,
      answers: [
        formData.answer1,
        formData.answer2,
        formData.answer3,
        formData.answer4,
      ],
      correctIndex: formData.correctIndex
    }
    
    fetch(baseUrl,RequestObjFactory(questionObj,"POST"))
    .then(res => res.json())
    .then(data => updateQuestions(data))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onFormSubmit={handleQuestionAdd} /> : <QuestionList questions={questions} onQuestionDelete={handleQuestionDelete} onQuestionUpdate={handleQuestionUpdate} />}
    </main>
  );
}

export default App;
