import React from "react";
import {
  IconNavBookMarkSVG,
  LogoSVG,
  IconPlaySVG,
  IconNavMoviesSVG,
  IconNavTvSeriesSVG,
  CategoryBookMarkSVG,
  CategoryTvSVG,
  IconSearchSVG,
  EmptyBookMarkSVG,
  IconNavHomeSVG,
} from "../assets/assets";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-darkBlue">
      <Image src={LogoSVG} alt="icon" />
      <div className="flex justify-center flex-grow">
        <div className="flex w-40 justify-between">
          <div className="group">
            <Image
              src={IconNavHomeSVG}
              alt="icon"
              className="group-hover:colors-red group-hover:brightness-150 group-hover:contrast-100"
            />
          </div>
          <div className="group">
            <Image
              src={IconNavMoviesSVG}
              alt="icon"
              className="group-hover:grayscale group-hover:brightness-150 group-hover:contrast-100"
            />
          </div>
          <div className="group">
            <Image
              src={IconNavTvSeriesSVG}
              alt="icon"
              className="group-hover:grayscale group-hover:brightness-150 group-hover:contrast-100"
            />
          </div>
          <div className="group">
            <Image
              src={IconNavBookMarkSVG}
              alt="icon"
              className="group-hover:grayscale group-hover:brightness-150 group-hover:contrast-100"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
