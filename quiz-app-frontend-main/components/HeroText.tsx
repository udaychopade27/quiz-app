export function HeroText({ isLogin }: { isLogin: boolean }) {
  return (
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">
        {isLogin ? "Login" : "Register"} now!
      </h1>
      <p className="py-6">
        Challenge yourself and test your knowledge with our quiz app! Create
        your own quizzes or play quizzes created by others. Sign up or log in to
        get started and climb the leaderboards with our highscore system.
      </p>
    </div>
  );
}
