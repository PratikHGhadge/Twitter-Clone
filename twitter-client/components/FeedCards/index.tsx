import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";
const FeedCard: React.FC = () => {
  return (
    <div className="border border-x-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className=" col-span-1">
          <Image
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/93422248?v=4"
            alt="user-image"
            height={50}
            width={50}
          ></Image>
        </div>
        <div className=" col-span-11">
          <h5>Pratik Ghadge</h5>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            et ullam voluptatum tenetur, aspernatur unde suscipit qui recusandae
          </p>
          <div className="flex justify-between p-2 mt-5 text-xl items-center">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeedCard;
