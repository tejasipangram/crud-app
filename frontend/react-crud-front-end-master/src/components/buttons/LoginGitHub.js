import React from "react";

const LoginGitHub = ({ gitHubLogin }) => {
  const submitHandler = () => {
    gitHubLogin();
  };
  return (
    <div onClick={submitHandler} role="button" className="github-btn my-4">
      <p className="btn-text">
        <b>Sign in with GitHub</b>
      </p>
    </div>
  );
};
export default LoginGitHub;
