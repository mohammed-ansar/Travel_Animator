"use client";

import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="absolute bottom-1 right-4 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
