import React, { useContext } from "react";
import Navbar from "../components/navbar";
import IDE from "../components/ide";
import Term from "../components/term";
import Video from "../components/video";
import { HeartwoodDispatchContext } from "../state/HeartwoodContextProvider";

import '../styles/video.css'

export default () => {
  const dispatch = useContext(HeartwoodDispatchContext)

  return (
    <div className="flex flex-col w-full h-screen bg-base">
      <Navbar />
      <div className="flex flex-row items-center justify-center w-full h-full ">
        <div className="flex flex-row w-full px-10">
          <div className="flex flex-col w-1/4">
            <div className="m-3 bg-black rounded-lg">
              <div className="relative rounded-lg pb-3/4">
                <div className="absolute object-cover w-full h-full">
                  <Video className="rounded-lg" />
                </div>
              </div>
            </div>
            <div className="h-full m-3 bg-blue-300 rounded-lg">
            </div>
          </div>
          <div className="flex flex-col w-3/4">
            <div className="h-64 m-3 overflow-scroll bg-ideBase rounded-lg">
              <IDE />
            </div>
            <div className="h-48 m-3 overflow-x-hidden bg-black rounded-lg px-4">
              <Term termId="term" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}