//client/src/PostsPage/EditPost.jsx

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput, Typography } from "@mui/material";
import { AuthContext } from "../../context/auth.context";
import UserCard from "../../components/Cards/UserCard";
import RichTextEditor from "../../components/Editor/RichTextEditor"; // Import the RichTextEditor
import "./EditPost.css";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({
    title: "",
    content: "",
    imgUrl: "",
    tags: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleContentChange = (value) => {
    setPost({
      ...post,
      content: value,
    });
  };

  const handleTagsChange = (e) => {
    const value = e.target.value;
    setPost({
      ...post,
      tags: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}`,
        post,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      );
      navigate(`/posts/${postId}`);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="EditPostPage">
    <h1 className="page-title">EDIT POST_</h1>
      <UserCard user={user} />
      <form onSubmit={handleSubmit} className="edit-post-form">
        <TextField
          label="Image URL"
          type="url"
          name="imgUrl"
          value={post.imgUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Title"
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <RichTextEditor
          value={post.content}
          onChange={handleContentChange}
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={post.tags}
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
                <Checkbox checked={post.tags.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </div>
  );
};

export default EditPost;

































// --------------------------------------------------------
// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput, Typography } from "@mui/material";
// import { AuthContext } from "../../context/auth.context";
// import UserCard from "../../components/Cards/UserCard";
// import "./EditPost.css";

// const EditPost = () => {
//   const { postId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [post, setPost] = useState({
//     title: "",
//     content: "",
//     imgUrl: "",
//     tags: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}`,
//           {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("authToken"),
//             },
//           }
//         );
//         setPost(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };
//     fetchPost();
//   }, [postId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPost({
//       ...post,
//       [name]: value,
//     });
//   };

//   const handleTagsChange = (e) => {
//     const value = e.target.value;
//     setPost({
//       ...post,
//       tags: typeof value === "string" ? value.split(",") : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}`,
//         post,
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("authToken"),
//           },
//         }
//       );
//       navigate(`/posts/${postId}`);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="EditPostPage">
//       <UserCard user={user} />
//       <form onSubmit={handleSubmit} className="edit-post-form">
//         <TextField
//           label="Image URL"
//           type="url"
//           name="imgUrl"
//           value={post.imgUrl}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//         />
//         <TextField
//           label="Title"
//           type="text"
//           name="title"
//           value={post.title}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//         />
//         <TextField
//           label="Content"
//           type="text"
//           name="content"
//           value={post.content}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           multiline
//           rows={4}
//         />
//         <FormControl fullWidth margin="normal" variant="outlined">
//           <InputLabel>Tags</InputLabel>
//           <Select
//             multiple
//             value={post.tags}
//             onChange={handleTagsChange}
//             input={<OutlinedInput label="Tags" />}
//             renderValue={(selected) => selected.join(", ")}
//           >
//             {[
//               "Building",
//               "Carbon",
//               "Energy",
//               "Food",
//               "Greentech",
//               "Investment",
//               "ReFi",
//               "Reform",
//               "Transport",
//             ].map((tag) => (
//               <MenuItem key={tag} value={tag}>
//                 <Checkbox checked={post.tags.indexOf(tag) > -1} />
//                 <ListItemText primary={tag} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Button type="submit" variant="contained" color="primary">
//           Save Changes
//         </Button>
//         {error && <Typography color="error">{error}</Typography>}
//       </form>
//     </div>
//   );
// };

// export default EditPost;