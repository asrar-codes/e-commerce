import React from "react";

const Loading = () => {
  return (
    <div className="flex  p-6 justify-center flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
    </div>
  );
};

export default Loading;
