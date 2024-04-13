/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./Fail.css";

export default function Error({ error }) {
  return (
    <div className="error-layout">
      <h1>Fail: {error}</h1>
     
      <Link
        className="error-work"
        to="/"
      >
        Back to begin
      </Link>
    </div>
  );
}
