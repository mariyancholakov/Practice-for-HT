import React from "react";
import CreatePost from "../components/CreatePost/CreatePost";

function CreatePostPage() {
  return (
    <div className="w-full h-screen flex justify-center items-baseline pt-20 bg-black text-white">
      <CreatePost />
    </div>
  );
}

export default CreatePostPage;