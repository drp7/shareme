import React from "react";
import { Vortex, ThreeDots } from "react-loader-spinner";

export default function Spinner({ message }) {
  return (
    <div className="grid place-content-center my-auto h-[calc(100vh-200px)]   ">
      <div className="flex flex-col gap-8 items-center">
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
        <p className="text-lg flex items-center  gap-1">
          <span>{message}</span>
          <ThreeDots
            height="40"
            width="40"
            radius="6"
            color="red"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </p>
      </div>
    </div>
  );
}
