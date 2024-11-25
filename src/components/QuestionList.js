import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, onQuestionDelete, onQuestionUpdate}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => <QuestionItem key={question.id} question={question} onQuestionDelete={onQuestionDelete} onQuestionUpdate={onQuestionUpdate} />)}</ul>
    </section>
  );
}

export default QuestionList;
