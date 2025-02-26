import React from "react";

const EmptyBagMessage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-center text-gray-500 text-3xl font-semibold">
        Your bag is currently empty
      </p>
    </div>
  );
};

export default EmptyBagMessage;
