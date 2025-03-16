import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import styles from "./CreatePost.module.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [board, setBoard] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

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
    <div className={styles.container}>
      <div className={styles.sections}>
        <div className={styles.uploadSection}>
          <h2 className={styles.title}>Click to Upload a Photo</h2>
          <label className={styles.uploadBox}>
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className={styles.previewImage}
              />
            ) : (
              <UploadIcon className={styles.uploadIcon} />
            )}
            <input type="file" hidden onChange={handleFileUpload} />
          </label>
        </div>

        <div className={styles.formSection}>
          <TextField
            variant="outlined"
            fullWidth
            label="Add a Title"
            className={styles.inputField}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
            sx={{ width: 500 }}
            required
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Add a description"
            className={styles.inputField}
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
            className={styles.inputField}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            size="small"
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Choose a board"
            className={styles.inputField}
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            size="small"
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Search for a tag"
            className={styles.inputField}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            size="small"
          />
        </div>
      </div>
      <Button
        className={styles.postButton}
        disabled={!title || !file}
        variant="contained"
        size="large"
        sx={{ width: 300 }}
        onClick={handleCreatePost}
      >
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
