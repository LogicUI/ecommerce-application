import React from "react";
import { useToast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface CustomToastProps {
  closeToast?: () => void;
  message: string;
}

const CustomToast = ({ closeToast, message }: CustomToastProps) => {
  return (
    <div>
      {message}
      <button onClick={closeToast}>OK</button>
    </div>
  );
};

export default CustomToast;
