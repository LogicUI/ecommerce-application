import React from "react";
import Image from "next/image";
import { SpinnerSVG } from "../assets/assets";

const Spinner = ({ text }: { text: string }) => {
  return (
    <>
      <div className="loader text-white mb-3">{text}</div>
      <Image
        src={SpinnerSVG}
        alt="spinner"
        className="animate-spin h-16 w-16"
      />
    </>
  );
};

export default Spinner;
