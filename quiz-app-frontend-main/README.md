# 

# **Quiz App Frontend**

The frontend for the Quiz App is built using Next.js, Tailwind, and TypeScript. It provides a user-friendly interface for users to interact with the backend API. The frontend allows users to sign up, sign in, view available quizzes, create new quiz, and play any quiz of their choice. The use of Next.js allows for fast rendering of the pages, while Tailwind provides a sleek and modern design. TypeScript is used for type checking and to ensure that the code is less prone to errors.

demo - [https://quiz-frontend-three.vercel.app/](https://quiz-frontend-three.vercel.app/)

repo for backend - [https://github.com/Shreyaan/Quiz-App-Backend](https://github.com/Shreyaan/Quiz-App-Backend) (will try to make it into a monorepo)

## **Features**

- User authentication with Firebase
- Create quizzes, View available quizzes and select one to play
- Play any quiz from the list of available quizzes
- Highscore system to track the top scores for each quiz
- Session lasts 60 minutes after which it's deleted so you have 1 hour to complete the quiz. You can even play it on different devices because it's all synced

## **Firebase Authentication**

The frontend uses Firebase Authentication to authenticate users. Users can sign up and sign in using their email and password. Once authenticated, the user's token is stored in the browser's local storage for easy access.

## **Available Quizzes**

The frontend displays all available quizzes that the user can play. The quizzes are fetched from the backend API and displayed in a list format. Each quiz contains the quiz's title, number of questions, and the best score achieved so far.

## **Playing a Quiz**

When the user selects a quiz to play, the frontend sends a GET request to the backend API to receive the first question. The question is then displayed on the page along with the options. The user selects their answer and submits it. The frontend sends a POST request to the backend API with the answer. The backend API sends the next question, and the process repeats until the user has answered all the questions or the session has expired.

## **Highscore System**

The frontend displays the highscore for each quiz, which is fetched from the backend API. The highscore is displayed as a list of the top 10 scores achieved so far.

## **Tech Stack**

- Next.js for fast rendering of pages and server-side rendering, ssg
- Tailwind for sleek and modern design
- TypeScript for type checking and error prevention
- Firebase for user authentication

## **Deployment**

The frontend is built using Next.js, Tailwind, and TypeScript, and can be deployed to any hosting service that supports Node.js applications. The backend API URL needs to be set in the code to enable communication with the backend.

## **Conclusion**

The Quiz App Frontend provides a seamless user experience with its sleek design and fast rendering of pages. The use of Next.js, Tailwind, and TypeScript ensures that the code is robust and less prone to errors. The integration with Firebase for user authentication and the backend API for quiz data and highscores ensures that the app is scalable and can handle multiple users playing quizzes at the same time.