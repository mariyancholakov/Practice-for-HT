import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [board, setBoard] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Manrope:wght@300&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  async function handleCreatePost() {
    /* const url = "http://localhost:3000/api/posts/"; */
    /* try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title, content, preview, link, board, tag}),
      });
      const data = await response.json();
      console.log(data);
    } catch {
      console.error("An error occurred while creating the post");
    } */
    const formData = new FormData();
    formData.append("title:", title);
    formData.append("description:", description);
    formData.append("link:", link);
    formData.append("board:", board);
    formData.append("tag:", tag);

    if (file) {
      formData.append("file:", preview);
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-black h-screen gap-12 p-5 border border-[#3a3a3a]">
      <div className="flex items-center justify-center bg-black gap-24 p-5">
        <div className="flex flex-col items-center gap-8">
          <h2
            className="text-[#a782e6] text-lg font-bold text-center"
            style={{ fontFamily: "Montserrat" }}>
            Click to Upload a Photo
          </h2>
          <label className="flex w-64 h-[350px] rounded-lg bg-[#EEEEEE] justify-center items-center border-2 border-dashed border-[#a782e6] overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <UploadIcon className="text-[#a782e6] text-xl" />
            )}
            <input type="file" hidden onChange={handleFileUpload} />
          </label>
        </div>

        <div className="flex flex-col gap-8 w-fit">
          <TextField
            variant="outlined"
            fullWidth
            label="Add a Title"
            className="bg-[#EEEEEE] rounded-lg max-w-full"
            sx={{
              "& label": {
                color: "#563A9C",
                fontFamily: "Manrope, Arial",
                fontWeight: "800",
              },
              width: 500,
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
            required
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Add a description"
            className="bg-[#EEEEEE] rounded-lg max-w-full"
            sx={{
              "& label": {
                color: "#563A9C",
                fontFamily: "Manrope, Arial",
                fontWeight: "800",
              },
              width: 500,
            }}
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Link"
            className="bg-[#EEEEEE] rounded-lg max-w-full"
            sx={{
              "& label": {
                color: "#563A9C",
                fontFamily: "Manrope, Arial",
                fontWeight: "800",
              },
              width: 500,
            }}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            size="small"
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Choose a board"
            className="bg-[#EEEEEE] rounded-lg max-w-full"
            sx={{
              "& label": {
                color: "#563A9C",
                fontFamily: "Manrope, Arial",
                fontWeight: "800",
              },
              width: 500,
            }}
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            size="small"
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Search for a tag"
            className="bg-[#EEEEEE] rounded-lg max-w-full"
            sx={{
              "& label": {
                color: "#563A9C",
                fontFamily: "Manrope, Arial",
                fontWeight: "800",
              },
              width: 500,
            }}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            size="small"
          />
        </div>
      </div>
      <Button
        className="postButton"
        disabled={!title || !file}
        variant="contained"
        size="large"
        sx={{
          width: 300,
          backgroundColor: !title || !file ? "#3a3a3a !important" : "#a782e6",
          color: !title || !file ? "#888 !important" : "white",
          cursor: !title || !file ? "not-allowed" : "pointer",
          opacity: !title || !file ? 0.6 : 1,
        }}
        onClick={handleCreatePost}>
        {!title && !file
          ? "Add a title & image first!"
          : !title
          ? "Add a title first!"
          : !file
          ? "Add an image first!"
          : "Create Post"}
      </Button>
    </div>
  );
}
