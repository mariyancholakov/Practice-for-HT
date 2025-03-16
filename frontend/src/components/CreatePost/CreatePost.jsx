import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from '@mui/icons-material/Add';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleFileChange(event) {
    setFiles(event.target.files);
  }

  function handleCreatePost() {
    //placeholder shtoto nz kak raboti backenda
    console.log("The title is: " + title);
    console.log("The content is: " + content);
    console.log("Images attached: ", files);
  }

  return (
    <div className={styles.createPost}>
      <div className={styles.innerPost}>
        <h1>Create a Post</h1>

        <TextField
          onChange={handleTitleChange}
          label="Title"
          variant="outlined"
          margin="normal"
          color="secondary"
          style={{ width: 450 }}
          helperText="Give a title to your photography post!"
          required
        />

        <TextField
          onChange={handleContentChange}
          label="Content"
          variant="outlined"
          color="secondary"
          fullWidth
          multiline
          rows={5}
          style={{ width: 450 }}
          helperText="Share about the backstory of the photos, your inspirations for them, etc."
        />

        <Button
          component="label"
          variant="contained"
          color="secondary"
          tabIndex={-1}
          startIcon={<UploadIcon />}
          style={{ width: 200, marginTop: 20 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 25px",
          }}
        >
          upload photos
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </Button>

        <Button
          onClick={handleCreatePost}
          variant="contained"
          disabled={title === ""}
          style={{ width: 200 }}
          sx={{
            padding: "10px",
          }}
        >
          {title === "" ? "Add a title first!" : "Publish post"}
        </Button >
      </div>
    </div>
  );
}