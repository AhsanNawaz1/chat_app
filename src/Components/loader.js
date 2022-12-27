import React from "react";
import {
  AnimationJSON,
} from "./index";
import Animation from "./JSONLayout";
function Loader() {
  return (
    <div className="logoOnGuide">
      <div>
        <Animation Pic={AnimationJSON} />
      </div>
    </div>
  );
}

export default Loader;