import React from "react";

const LoginGoogle = ({ onSubmit }) => {
  const submitHandler = () => {
    onSubmit();
  };
  return (
    <div onClick={submitHandler} role="button" className="google-btn my-4">
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p className="btn-text">
        <b>Sign in with google</b>
      </p>
    </div>
  );
};

export default LoginGoogle;
