import React from "react";
import TwemojiHeader from "@/components/TwemojiHeader";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-xl max-w-md w-full text-center">
        <div className="card-body">
          <TwemojiHeader />
          <h2 className="card-title text-2xl mb-4 justify-center">
            メンテナンス中
          </h2>
          <p className="mb-4">
            現在サイトはメンテナンス中です
            <br />
            しばらくしてから再度アクセスしてください
          </p>
        </div>
      </div>
    </div>
  );
}
