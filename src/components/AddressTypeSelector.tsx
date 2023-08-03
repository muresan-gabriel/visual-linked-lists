import React from "react";

import State from "../State";
import {
  CpuChipIcon,
  HashtagIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function AddressTypeSelector() {
  const [state, setState] = React.useState<State>(new State());
  return (
    <div className="flex px-2">
      <div className="[&>button]:py-3 [&>button]:w-[25rem] [&>button]:transition [&>button]:duration-1 flex">
        <button
          className={`flex items-center hover:bg-slate-800 rounded-tl-2xl rounded-bl-2xl px-2 ${
            state.addressType === "real"
              ? "bg-slate-800 [&>div>svg]:text-indigo-500"
              : ""
          }`}
          onClick={() => {
            State.setAddressType("real");
            setState(new State());
          }}
        >
          <div
            id="checkbox"
            className="bg-slate-800 p-1 rounded-lg w-7 h-7 absolute translate-x-[22rem] translate-y-[-0.7rem] border border-slate-700 flex items-center justify-center"
          >
            {state.addressType === "real" ? (
              <CheckIcon className="w-4 h-4 text-slate-100" />
            ) : null}
          </div>

          <div className="bg-slate-800 p-2 rounded-lg mr-3">
            <CpuChipIcon className="w-6 h-6 text-slate-100" />
          </div>
          <div className="text-left">
            <div
              className={`font-medium text-md ${
                state.addressType === "real" ? "text-indigo-500" : ""
              }`}
            >
              Real
            </div>
            <div className="text-sm text-slate-500">
              Uses real addresses for the nodes.
            </div>
          </div>
        </button>
        <button
          className={`flex items-center hover:bg-slate-800 px-2 ${
            state.addressType === "simplified"
              ? "bg-slate-800 [&>div>svg]:text-indigo-500"
              : ""
          }`}
          onClick={() => {
            State.setAddressType("simplified");
            setState(new State());
          }}
        >
          <div
            id="checkbox"
            className="bg-slate-800 p-1 rounded-lg w-7 h-7 absolute translate-x-[22rem] translate-y-[-0.7rem] border border-slate-700 flex items-center justify-center"
          >
            {state.addressType === "simplified" ? (
              <CheckIcon className="w-4 h-4 text-slate-100" />
            ) : null}
          </div>
          <div className="bg-slate-800 p-2 rounded-lg mr-3">
            <FaceSmileIcon className="w-6 h-6 text-slate-100" />
          </div>
          <div className="text-left">
            <div
              className={`font-medium text-md ${
                state.addressType === "simplified" ? "text-indigo-500" : ""
              }`}
            >
              Simplified
            </div>
            <div className="text-sm text-slate-500">
              Uses simplified addresses for the nodes.
            </div>
          </div>
        </button>
        <button
          className={`flex items-center hover:bg-slate-800 rounded-tr-2xl rounded-br-2xl px-2 ${
            state.addressType === "integers"
              ? "bg-slate-800 [&>div>svg]:text-indigo-500"
              : ""
          }`}
          onClick={() => {
            State.setAddressType("integers");
            setState(new State());
          }}
        >
          <div
            id="checkbox"
            className="bg-slate-800 p-1 rounded-lg w-7 h-7 absolute translate-x-[22rem] translate-y-[-0.7rem] border border-slate-700 flex items-center justify-center"
          >
            {state.addressType === "integers" ? (
              <CheckIcon className="w-4 h-4 text-slate-100" />
            ) : null}
          </div>
          <div className="bg-slate-800 p-2 rounded-lg mr-3">
            <HashtagIcon className="w-6 h-6 text-slate-100" />
          </div>
          <div className="text-left">
            <div
              className={`font-medium text-md ${
                state.addressType === "integers" ? "text-indigo-500" : ""
              }`}
            >
              Integers
            </div>
            <div className="text-sm text-slate-500">
              Uses whole numbers for the nodes.
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}