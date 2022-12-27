import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
function Animation({ Pic, Message, splash }) {
  const defaultOptions = {
    loop: splash ? false : true,
    autoplay: true,
    animationData: Pic,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie
        isClickToPauseDisabled
        options={defaultOptions}
        isStopped={false}
        isPaused={false}
        height={'250'}
        width={'250px'}
        padding={"0%"}
      />
      {Message && (
        <h3 className="text-secondary text-center mt-4">{Message}</h3>
      )}
    </div>
  );
}

export default Animation;
