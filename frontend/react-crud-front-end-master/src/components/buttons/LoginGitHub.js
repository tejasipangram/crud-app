import React from "react";
import { AiFillGithub } from "react-icons/ai";
const LoginGitHub = ({ gitHubLogin }) => {
  const submitHandler = () => {
    gitHubLogin();
  };
  return (
    <div
      onClick={submitHandler}
      role="button"
      className="github-btn  d-flex justify-content-center align-items-center"
    >
      <p className="btn-text m-0 d-flex  justify-content-between align-items-center">
        <AiFillGithub size={25} />
        <span> Sign in with GitHub</span>
      </p>
    </div>
  );
};
export default LoginGitHub;
