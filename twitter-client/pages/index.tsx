import { Inter } from "next/font/google";
import React, { ReactNode, useCallback } from "react";
import { FaTwitter } from "react-icons/fa6";
import { BiHomeCircle, BiHash, BiBell, BiUser } from "react-icons/bi";
import { BsBookmark, BsEnvelope } from "react-icons/bs";
import FeedCard from "@/components/FeedCards";
import { CiCircleMore } from "react-icons/ci";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

const inter = Inter({ subsets: ["latin"] });
interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenuItems: TwitterSidebarButton[] = [
  { title: "Home", icon: <BiHomeCircle /> },
  { title: "Explore", icon: <BiHash /> },
  { title: "Notification", icon: <BiBell /> },
  { title: "Messages", icon: <BsEnvelope></BsEnvelope> },
  { title: "BookMark", icon: <BsBookmark /> },
  { title: "Profile", icon: <BiUser /> },
  { title: "More Options", icon: <CiCircleMore /> },
];

export default function Home() {
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error("Google token not found");
      }
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );
      toast.success("verified success");
      if (verifyGoogleToken) {
        window.localStorage.setItem("token", verifyGoogleToken);
      }
    },
    []
  );
  return (
    <div className={inter.className}>
      <div
        className="grid grid-cols-12 h-screen w-screen 
      2xl:px-36 sm:px-0"
      >
        <div className="col-span-3  pt-8 ml-32">
          <div className="text-4xl hover:bg-gray-800 rounded-full p-2 h-fit w-fit cursor-pointer transition-all ml-4">
            <FaTwitter />
          </div>
          <div className="mt-4 text-xl font-semi-bold mr-2">
            <ul>
              {sideBarMenuItems.map((item) => (
                <li
                  key={item.title}
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 cursor-pointer py-2 w-full mt-2"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="text-lg pl-2">
              <button className="flex justify-start text-center items-center bg-[#1d9bf0] rounded-full cursor-pointer py-2 ml-2 mr-8 mt-4 w-wrap px-16 ">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] border border-gray-600  ">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
          <div className=" bg-white m-6 rounded-lg ">
            <h3 className="text-gray-900 pt-4 text-center ">
              Sign in to twitter with google
            </h3>
            <p className=" border-t-gray-300 mt-3 border-[0.1px]"></p>
            <div className="p-4 flex items-center">
              <GoogleLogin
                onSuccess={handleLoginWithGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
