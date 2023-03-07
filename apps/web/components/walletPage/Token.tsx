import React from "react";

type Props = {};

const Token = (props: Props) => {
  return (
    <div className="my-2">
      <div className="flex flex-col border border-transparent rounded-t-lg shadow bg-slate-900 p-3">
        <div className="my-2">
          <div className="flex flex-row justify-between">
            <h3 className="text-sm font-bold">Solana</h3>
            <h3 className="text-sm font-medium">~ 0 SOL</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col border border-transparent rounded-b-lg shadow bg-slate-800 p-3">
        <div className="my-2 ">
          <div className="flex flex-row justify-between">
            <h3 className="text-xs">1 SOL ≈ 22.85 USD</h3>
            <h3 className="text-xs font-medium">~0.00 USD</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;
