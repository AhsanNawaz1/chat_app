import React from "react";
import {
  LoaderAnimation
} from "../../Assets/index";
import Animation from "./JSONLayout";

function AnimationLogo() {
  return (
    <div className="logoOnGuide">
      <div>
        <Animation Pic={LoaderAnimation} />
      </div>
    </div>
  );
}

export default AnimationLogo;
