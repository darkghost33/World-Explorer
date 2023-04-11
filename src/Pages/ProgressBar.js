import "./ProgressBar.css";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularColor(props) {
  return (
    <div className="progress-bar">
      <div>
        <CircularProgress size={70} color="secondary" />
      </div>
      <h2>{`${props.data}`}</h2>
    </div>
  );
}
