import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { HeroText } from "../components/HeroText";
import { api_url, toastifyConfig } from "../utils/config";
import { useLocalStorage } from "usehooks-ts";
import { ChangeEvent, SetStateAction, use, useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { errorHandler } from "../utils/errorHandler";
import Link from "next/link";
import { Question } from "./quiz";
import { toast } from "react-toastify";
import router from "next/router";

interface Questions {
  Name: string;
  Slug?: string;
  image: string;
  created_by?: string;
  quizId?: string;
  questions: Question[];
}

const Quiz: NextPage = () => {
  const [authToken, setAuthtoken] = useLocalStorage("authToken", "");

  useEffect(() => {
    if (!authToken) {
      Router.push("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    Name: "",
    image: "",
    questions: [] as Question[],
  });

  const [selectedFile, setSelectedFile] = useState(null as File | null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile((prevState) => event.target.files![0]);
  };

  useEffect(() => {
    if (selectedFile) {
      const handleFileUpload = () => {
        const headers = {
          Authorization: "Bearer " + authToken,
        };

        const formD = new FormData();
        formD.append("image", selectedFile!);
        setUploading(true);
        axios
          .post(api_url + "/quiz/upload", formD, {
            headers,
          })
          .then((response) => {
            console.log(response.data.url);
            let url = response.data.url as string;
            if (url) {
              setFormData({ ...formData, image: url });
              toast.success("Image uploaded successfully", toastifyConfig);
              setSelectedFile(null);
              setUploading(false);
            } else {
              toast.error("Image upload failed", toastifyConfig);
              setUploading(false);
            }
          })
          .catch((error) => {
            errorHandler(error);
            setUploading(false);
          });
      };

      handleFileUpload();
    }
  }, [selectedFile]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const questions = formData.questions.map((question, i) => {
      if (i === index) {
        return {
          ...question,
          question: event.target.value,
        };
      }
      return question;
    });
    setFormData({ ...formData, questions });
  };

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const questions = formData.questions.map((question, i) => {
      if (i === index) {
        return {
          ...question,
          answer: event.target.value,
        };
      }
      return question;
    });
    setFormData({ ...formData, questions });
  };

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    option: string
  ) => {
    const questions = formData.questions.map((question, i) => {
      if (i === index) {
        return {
          ...question,
          options: {
            ...question.options,
            [option]: event.target.value,
          },
        };
      }
      return question;
    });
    setFormData({ ...formData, questions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { question: "", options: { a: "", b: "", c: "", d: "" }, answer: "" },
      ],
    });
  };

  const removeQuestion = (index: number) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== index),
    });
  };

  function createQuiz() {
    if (formData.questions.length < 5) {
      toast.error("Please add atleast 5 questions", toastifyConfig);
      return;
    }

    if (formData.Name === "") {
      toast.error("Please enter quiz name", toastifyConfig);
      return;
    }

    if (formData.image === "") {
      toast.error("Please enter image link", toastifyConfig);
      return;
    }

    //check if all questions have been filled
    formData.questions.forEach((question, index) => {
      if (question.question === "") {
        toast.error(`Please enter question ${index + 1}`, toastifyConfig);
        return;
      }
      if (question.options.a === "") {
        toast.error(
          `Please enter option a for question ${index + 1}`,
          toastifyConfig
        );
        return;
      }
      if (question.options.b === "") {
        toast.error(
          `Please enter option b for question ${index + 1}`,
          toastifyConfig
        );
        return;
      }
      if (question.options.c === "") {
        toast.error(
          `Please enter option c for question ${index + 1}`,
          toastifyConfig
        );
        return;
      }
      if (question.options.d === "") {
        toast.error(
          `Please enter option d for question ${index + 1}`,
          toastifyConfig
        );
        return;
      }
      if (question.answer === "") {
        toast.error(
          `Please select answer for question ${index + 1}`,
          toastifyConfig
        );
        return;
      }
    });

    var config = {
      method: "post",
      url: api_url + "/quiz/new",
      headers: {
        Authorization: "Bearer " + authToken,
      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        toast.success("Quiz Created Successfully", toastifyConfig);
        router.push("/quiz");
      })
      .catch(function (error) {
        errorHandler(error);
      });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>quiz app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col items-center justify-center ">
          <div className="my-4 mt-8 text-center flex flex-col items-center">
            <h2 className="card-title text-5xl">Create Quiz</h2>
            <h3 className="text-center text-red-500">
              all feilds are mandatory
            </h3>
          </div>
          <div className="card w-[80vw] lg:w-[60vw]  shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quiz Name</span>
                </label>
                <input
                  name="Name"
                  type="text"
                  placeholder="Quiz Name"
                  className="input input-bordered"
                  onChange={handleChange}
                  value={formData.Name}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                {/* <input
                  name="image"
                  type="text"
                  placeholder="image link"
                  className="input input-bordered"
                  onChange={handleChange}
                  value={formData.image}
                /> */}
                <div>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs mb-4"
                    accept=".jpeg, .png"
                    onChange={handleFileChange}
                  />
                  {uploading ? (
                    <div className="text-center">
                      <div className="spinner"></div>
                      <p className="font-bold text-xl py-8 ">Uploading Image...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      {formData.image && (
                        <img src={formData.image} alt="Selected Image" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {formData.questions.map((question, index) => (
                <div key={index}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Question {index + 1}</span>
                    </label>
                    <input
                      name="question"
                      type="text"
                      placeholder="Enter question"
                      className="input input-bordered"
                      value={question.question}
                      onChange={(event) => handleQuestionChange(event, index)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Option A</span>
                    </label>
                    <input
                      name="a"
                      type="text"
                      placeholder="Enter option A"
                      className="input input-bordered"
                      value={question.options.a}
                      onChange={(event) =>
                        handleOptionChange(event, index, "a")
                      }
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Option B</span>
                    </label>
                    <input
                      name="b"
                      type="text"
                      placeholder="Enter option B"
                      className="input input-bordered"
                      value={question.options.b}
                      onChange={(event) =>
                        handleOptionChange(event, index, "b")
                      }
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Option C</span>
                    </label>
                    <input
                      name="c"
                      type="text"
                      placeholder="Enter option C"
                      className="input input-bordered"
                      value={question.options.c}
                      onChange={(event) =>
                        handleOptionChange(event, index, "c")
                      }
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Option D</span>
                    </label>
                    <input
                      name="d"
                      type="text"
                      placeholder="Enter option D"
                      className="input input-bordered"
                      value={question.options.d}
                      onChange={(event) =>
                        handleOptionChange(event, index, "d")
                      }
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Answer</span>
                    </label>
                    <select
                      name="answer"
                      className="select select-bordered w-full max-w-xs"
                      value={question.answer}
                      onChange={(event) => handleAnswerChange(event, index)}
                    >
                      <option value="">Select Answer</option>
                      <option value="a">Option A</option>
                      <option value="b">Option B</option>
                      <option value="c">Option C</option>
                      <option value="d">Option D</option>
                    </select>
                  </div>

                  <button
                    onClick={() => removeQuestion(index)}
                    className="btn btn-error my-4"
                  >
                    Remove Question
                  </button>
                </div>
              ))}
              <button className="btn btn-accent" onClick={addQuestion}>
                Add Question
              </button>

              <div className="form-control mt-6">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    console.log(formData);

                    createQuiz();
                  }}
                >
                  Create Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
