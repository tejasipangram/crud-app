import React, { useContext } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { GlobalContext } from "./GloblaCotext";

const Loader = () => {
  const { loading } = useContext(GlobalContext);
  return (
    <div className={`loader ${!loading ? "hide" : null}`}>
      {loading && <InfinitySpin width="200" color="#4fa94d" />}
    </div>
  );
};

export default Loader;
