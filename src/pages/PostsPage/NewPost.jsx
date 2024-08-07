//client/src/pages/PostsPage/NewPost.jsx

import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../context/auth.context";
import UserCard from "../../components/Cards/UserCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../../components/Editor/RichTextEditor"; // Import the RichTextEditor
import "./NewPost.css";

const NewPost = () => {
  const { user } = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [errorMessage] = useState("");
  const navigate = useNavigate();

  const handleImgUrlChange = (e) => setImgUrl(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (value) => setContent(value); // Adjust to handle content from the RichTextEditor
  const handleTagsChange = (e) => {
    const value = e.target.value;
    setTags(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:5005/api/posts`,
        {
          imgUrl,
          title,
          content,
          tags,
          user: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      )
      .then((response) => {
        navigate("/posts");
      });
  };

  return (
    <div className="NewPostPage">
    <h1 className="page-title">POST_</h1>
      <UserCard user={user} />
      <form onSubmit={handleSubmit} className="new-post-form">
        <TextField
          label="Image URL"
          type="url"
          name="imgUrl"
          value={imgUrl}
          onChange={handleImgUrlChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Title"
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <RichTextEditor value={content} onChange={handleContentChange} />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={tags}
            onChange={handleTagsChange}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {[
              "building",
              "carbon",
              "energy",
              "food",
              "greentech",
              "investment",
              "nature-based",
              "refi",
              "transport",
              "reform",
              "other",
            ].map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={tags.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Publish
        </Button>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </form>
    </div>
  );
};

export default NewPost;
