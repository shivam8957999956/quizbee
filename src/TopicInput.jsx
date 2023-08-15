import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
const OTDB_API_BASE_URL = "https://opentdb.com/api.php";

const TopicInput = () => {
  const { user: currentUser } = useUser();

  const [selectedCategory, setSelectedCategory] = useState("9"); // Default category: General Knowledge
  const [categories, setCategories] = useState([
    { id: "9", name: "General Knowledge" },
    { id: "10", name: "Entertainment: Books" },
    { id: "11", name: "Entertainment: Film" },
    { id: "12", name: "Entertainment: Music" },
    { id: "13", name: "Entertainment: Musicals & Theatres" },
    { id: "14", name: "Entertainment: Television" },
    { id: "15", name: "Entertainment: Video Games" },
    { id: "16", name: "Entertainment: Board Games" },
    { id: "17", name: "Science & Nature" },
    { id: "18", name: "Science: Computers" },
    { id: "19", name: "Science: Mathematics" },
    { id: "20", name: "Mythology" },
    { id: "21", name: "Sports" },
    { id: "22", name: "Geography" },
    { id: "23", name: "History" },
    { id: "24", name: "Politics" },
    { id: "25", name: "Art" },
    { id: "26", name: "Celebrities" },
    { id: "27", name: "Animals" },
    { id: "28", name: "Vehicles" },
    { id: "29", name: "Entertainment: Comics" },
    { id: "30", name: "Science: Gadgets" },
    { id: "31", name: "Entertainment: Japanese Anime & Manga" },
    { id: "32", name: "Entertainment: Cartoon & Animations" },
  ]);
  const [questions, setQuestions] = useState([]);
  const [acc, setAcc] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(OTDB_API_BASE_URL, {
        params: {
          amount: 5, // Number of questions
          category: selectedCategory,
          type: "multiple",
          difficulty: calculateDifficulty(acc),
        },
      });

      setQuestions(response.data.results);
      setUserAnswers({});
      setShowResults(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedCategory]);

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    calculateResults();
    setShowResults(true);
  };
  const calculateResults = () => {
    const correctAnswers = questions.filter((question, index) => {
      return userAnswers[index] === question.correct_answer;
    });

    const accuracy = (correctAnswers.length / questions.length) * 100;
    const score = correctAnswers.length;
    setAcc(correctAnswers.length / questions.length);
    console.log(`Accuracy: ${accuracy.toFixed(2)}%`);
    console.log(`Correct Answers: ${score} / ${questions.length}`);
  };
  const calculateAccuracy = () => {
    const correctAnswers = questions.filter((question, index) => {
      return userAnswers[index] === question.correct_answer;
    });

    return (correctAnswers.length / questions.length) * 100;
  };

  const calculateScore = () => {
    const correctAnswers = questions.filter((question, index) => {
      return userAnswers[index] === question.correct_answer;
    });

    return correctAnswers.length;
  };
  const calculateDifficulty = (accuracy) => {
    if (accuracy >= 0.8) {
      return "hard";
    } else if (accuracy >= 0.6) {
      return "medium";
    } else {
      return "easy";
    }
  };
  return (
    <div className="login-box  extra">
      <h2>Choose a Category</h2>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button className="btn" onClick={fetchQuestions}>
        {showResults == false ? "Get Questions" : "Go to next Level"}
      </button>
      {showResults === false && (
        <>
          {questions.map((question, index) => (
            <div className="question" key={index}>
              <h3>Question {index + 1}</h3>
              <div dangerouslySetInnerHTML={{ __html: question.question }} />
              <ul>
                {[...question.incorrect_answers, question.correct_answer].map(
                  (option, optionIndex) => (
                    <li className="List" key={optionIndex}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={userAnswers[index] === option}
                          onChange={() => handleOptionSelect(index, option)}
                        />
                        <span dangerouslySetInnerHTML={{ __html: option }} />
                      </label>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
          <button className="btn" onClick={handleSubmit}>
            Submit Answers
          </button>
        </>
      )}
      {showResults && (
        <div>
          <h2>Quiz Results</h2>
          <p>Accuracy: {calculateAccuracy().toFixed(2)}%</p>
          <p>
            Correct Answers: {calculateScore()} / {questions.length}
          </p>
        </div>
      )}
      {showResults && (
        <div>
          <h2>Results</h2>
          {questions.map((question, index) => (
            <div key={index}>
              <p>
                <div dangerouslySetInnerHTML={{ __html: question.question }} />
              </p>
              <p>Correct Answer: {question.correct_answer}</p>
              <p>Your Answer: {userAnswers[index] || "Not answered"}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicInput;
