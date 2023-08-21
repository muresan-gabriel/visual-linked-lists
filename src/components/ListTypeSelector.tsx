import React from "react";

import State from "../State.ts";
import {
  CpuChipIcon,
  HashtagIcon,
  FaceSmileIcon,
  ArrowSmallRightIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function ListTypeSelector() {
  const [state, setState] = React.useState<State>(new State());

  return (
    <div className="flex px-2">
      <div className="[&>button]:py-3 xl:[&>button]:w-[37.5rem] [&>button]:w-[20rem] [&>button]:transition [&>button]:duration-1 flex xl:flex-row flex-col border border-slate-800 rounded-2xl">
        <button
          className={`flex items-center hover:bg-slate-800 xl:rounded-tl-2xl xl:rounded-bl-2xl rounded-t-2xl xl:rounded-t-[0px] px-2 ${
            state.listType === "singly"
              ? "bg-slate-800 [&>div>svg]:text-indigo-500"
              : ""
          }`}
          onClick={() => {
            State.setListType("singly");
            setState(new State());
          }}
        >
          <div
            id="checkbox"
            className="bg-slate-800 p-1 rounded-lg w-7 h-7 absolute translate-x-[34.5rem] translate-y-[-0.7rem] border border-slate-700 flex items-center justify-center"
          >
            {state.listType === "singly" ? (
              <CheckIcon className="w-4 h-4 text-slate-100" />
            ) : null}
          </div>

          <div className="bg-slate-800 p-2 rounded-lg mr-3">
            <ArrowSmallRightIcon className="w-6 h-6 text-slate-100" />
          </div>
          <div className="text-left">
            <div
              className={`font-medium text-md ${
                state.listType === "singly" ? "text-indigo-500" : ""
              }`}
            >
              Singly
            </div>
            <div className="text-sm text-slate-500">
              Generate singly linked lists.
            </div>
          </div>
        </button>
        <button
          className={`flex items-center hover:bg-slate-800 xl:rounded-tr-2xl xl:rounded-br-2xl rounded-b-xl xl:rounded-b-[0px] xl:rounded-t-[0px] px-2 ${
            state.listType === "doubly"
              ? "bg-slate-800 [&>div>svg]:text-indigo-500"
              : ""
          }`}
          onClick={() => {
            State.setListType("doubly");
            setState(new State());
          }}
        >
          <div
            id="checkbox"
            className="bg-slate-800 p-1 rounded-lg w-7 h-7 absolute translate-x-[34.5rem] translate-y-[-0.7rem] border border-slate-700 flex items-center justify-center"
          >
            {state.listType === "doubly" ? (
              <CheckIcon className="w-4 h-4 text-slate-100" />
            ) : null}
          </div>

          <div className="bg-slate-800 p-2 rounded-lg mr-3">
            <ArrowsRightLeftIcon className="w-6 h-6 text-slate-100" />
          </div>
          <div className="text-left">
            <div
              className={`font-medium text-md ${
                state.listType === "doubly" ? "text-indigo-500" : ""
              }`}
            >
              Doubly
            </div>
            <div className="text-sm text-slate-500">
              Generate doubly linked lists.
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
