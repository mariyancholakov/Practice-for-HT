import React, { useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { toast } from "react-toastify";

export default function CreatePost() {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    link: "",
    board: "",
    tags: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);  // Reference to the file input

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleCreatePost() {
    const url = "http://localhost:3000/api/posts/";
    const formData = new FormData();

    formData.append("name", inputs.title);
    formData.append("description", inputs.description);
    formData.append("tags", inputs.tags);
    formData.append("file", file);

    const toastOptions = {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return;
      }

      toast.success("Post creation successful!", {
        ...toastOptions,
        style: { backgroundColor: "#4caf50", color: "#fff" },
      });

      setInputs({
        title: "",
        description: "",
        link: "",
        board: "",
        tags: "",
      });
      setPreview(null); // Reset the preview
      setFile(null); // Reset the file

      // Reset the file input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      toast.error("Post creation failed!", {
        ...toastOptions,
        style: { backgroundColor: "#f44336", color: "#fff" },
      });
    }
  }

  const inputFields = [
    { name: "title", label: "Add a Title", required: true },
    {
      name: "description",
      label: "Add a Description",
      multiline: true,
      rows: 4,
    },
    { name: "link", label: "Link" },
    { name: "board", label: "Choose a Board" },
    { name: "tags", label: "Search for tags" },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-black h-screen gap-8">
      <div className="flex items-center justify-center bg-black gap-24">
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-[#a782e6] text-lg font-bold text-center">
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
            <input
              type="file"
              hidden
              onChange={handleFileUpload}
              ref={fileInputRef} // Attach ref to the file input
            />
          </label>
        </div>

        <div className="flex flex-col gap-8 w-fit">
          {inputFields.map(({ name, label, ...props }) => (
            <TextField
              key={name}
              name={name}
              variant="outlined"
              fullWidth
              label={label}
              className="bg-[#EEEEEE] rounded-lg"
              sx={{
                "& label": {
                  color: "#563A9C",
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                },
                width: 500,
              }}
              value={inputs[name]}
              onChange={handleInputChange}
              size="small"
              {...props}
            />
          ))}
        </div>
      </div>

      <Button
        className="postButton"
        disabled={!inputs.title || !file}
        variant="contained"
        size="large"
        sx={{
          width: 300,
          backgroundColor:
            !inputs.title || !file ? "#3a3a3a !important" : "#a782e6",
          color: !inputs.title || !file ? "#888 !important" : "white",
          cursor: !inputs.title || !file ? "not-allowed" : "pointer",
          opacity: !inputs.title || !file ? 0.6 : 1,
        }}
        onClick={handleCreatePost}>
        {!inputs.title && !file
          ? "Add a title & image first!"
          : !inputs.title
          ? "Add a title first!"
          : !file
          ? "Add an image first!"
          : "Create Post"}
      </Button>
    </div>
  );
}