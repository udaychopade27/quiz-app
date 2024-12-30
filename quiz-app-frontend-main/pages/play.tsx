import axios from "axios";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { api_url, toastifyConfigPlay } from "../utils/config";
import { errorHandler } from "../utils/errorHandler";
import Link from "next/link";
import { toast } from "react-toastify";

function Navbar() {
  const [userName, setUserName] = useLocalStorage("userName", "");
  const [showAvatar, setShowAvatar] = useState(false);
  const [authToken, setAuthtoken] = useLocalStorage("authToken", "");

  useEffect(() => {
    if (userName) {
      setShowAvatar(true);
    }
  }, [userName]);

  return (
    <div className="navbar bg-base-100 z-10 sticky top-0 ">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href={"./"}>
          Quiz app
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost avatar">
            {showAvatar && (
              <div className="">
                <div className="w-9 h-9 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
                  {userName[0]}
                </div>
              </div>
            )}
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>My quizzes</a>
            </li>
            <li>
              <button
                onClick={() => {
                  setUserName("");
                  setAuthtoken("");
                  Router.push("/");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const QuizPage = () => {
  const router = useRouter();
  const quizId = router.query.quiz as string;

  const [authToken, setAuthtoken] = useLocalStorage("authToken", "");
  const [totalScore , setTotalScore] = useLocalStorage("totalScore", 0);

  const [question, setQuestion] = useState<any>({});

  const [count, setCount] = useState(0);

  const [quizSlug, setQuizSlug] = useState("");

  useEffect(() => {
    if (!authToken) {
      Router.push("/");
    } else {
      var config = {
        method: "get",
        url: api_url + "/play/question",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };

      axios(config)
        .then(function (response: { data: any }) {
          setQuestion(response.data);
          setQuizSlug(response.data.quizSlug);
        })
        .catch(function (error: any) {
          if (error.response.data.message === "No quiz selected") {
            console.log("No quiz selected");

            Router.push("/quiz");
            return;
          }
          errorHandler(error);
          Router.push("/quiz");
        });
    }
  }, [count]);

  function handleAnswer(answer: string) {
    var data = JSON.stringify({
      answer: answer,
      quizSlug: quizSlug,
    });

    var config = {
      method: "post",
      url: api_url + "/play/answer",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        let score = response.data.score || response.data.currentScore;
        let questionsLeft;
        if (response.data.questionsLeft) {
          questionsLeft = " Ques left:" + response.data.questionsLeft;
        } else {
          questionsLeft = "";
        }
        if (response.data.isCorrect) {
          toast.success(
            response.data.message + questionsLeft,
            toastifyConfigPlay
          );
        } else {
          toast.error(
            response.data.message + questionsLeft,
            toastifyConfigPlay
          );
        }
        if (response.data.questionsLeft) {
          setCount(count + 1);
        } else {
          setTotalScore(score);
            Router.push("/score" );
        //   router.push("./quiz");
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="card flex justify-center items-center md:mt-36">
          {question.question && (
            <div className="card-body">
              <h2 className="card-title">{question.question}</h2>
              <div className="card-actions flex justify-center items-center mt-8">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleAnswer("a");
                  }}
                >
                  {question?.Options?.a}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleAnswer("b");
                  }}
                >
                  {question?.Options?.b}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleAnswer("c");
                  }}
                >
                  {question?.Options?.c}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleAnswer("d");
                  }}
                >
                  {question?.Options?.d}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
