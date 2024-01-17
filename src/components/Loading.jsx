import React from "react";

const Loading = () => {
  // <h1 className="text-2xl font-medium capitalize text-center">loading...</h1>
  return (
    <div class="flex  p-6 justify-center flex-row gap-2">
      <div class="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
      <div class="w-4 h-4 rounded-full bg-blue-400 animate-bounce [animation-delay:.3s]"></div>
      <div class="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
    </div>
  );
};

export default Loading;
