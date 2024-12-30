import axios from "axios";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { QuestionsWithoutQuestions } from ".";
import { api_url } from "../../utils/config";
import { errorHandler } from "../../utils/errorHandler";
import Link from "next/link";

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
  const [quiz, setQuiz] = useState<QuestionsWithoutQuestions>();

  useEffect(() => {
    if (!authToken) {
      Router.push("/");
    } else {
      if (!quizId) {
        return;
      }
      var config = {
        method: "get",
        url: api_url + "/quiz/" + quizId,
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };

      axios(config)
        .then(function (response: { data: QuestionsWithoutQuestions[] }) {
          setQuiz(response.data as unknown as QuestionsWithoutQuestions);
        })
        .catch(function (error: any) {
          errorHandler(error);
        });
    }
  }, [quizId]);

  const handleClick = () => {
    var axios = require("axios");

    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: api_url + "/play/select/" + quizId,
      headers: {
        Authorization: "Bearer " + authToken,
      },
    };

    axios(config)
      .then(function (response: { data: any; }) {
        console.log(JSON.stringify(response.data));
        Router.push("../play/");
      })
      .catch(function (error: any) {
        errorHandler(error);
      });
  };

  return (
    <div>
      <Navbar />
      {quiz && (
        <div className="hero min-h-[90vh] bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold"> {quiz.Name} Quiz </h1>
              <p className="py-6">Created by - {quiz.created_by}</p>
              <img
                src={quiz.image}
                className=" md:max-w-sm rounded-lg shadow-2xl mx-auto my-5 mb-10 max-h-64 max-w-[90vw]"
              />
              <button onClick={handleClick} className="btn btn-primary">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
