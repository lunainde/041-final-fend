// client/src/pages/ArticlePage/ArticlePage.jsx

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Chip, Divider, IconButton, Avatar, Link } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../context/auth.context";
import CardActionButtons from "../../components/Cards/CardActionButtons";
import "./ArticlePage.css";

const ArticlePage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Get current user from AuthContext

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

  // ------EDIT/DELETE-----------
  const handleEdit = () => {
    navigate(`/posts/edit/${post._id}`);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/${post._id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      );
      navigate("/posts");
    } catch (error) {
      console.error("Failed to delete the post:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const isAuthor = user && user._id === post.user._id;

  return (
    <div className="page-container">
      <Box
        className="center-article"
        
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 6
        }}
      >
        <Card sx={{ maxWidth: 1200 }}>
          <CardMedia
            component="img"
            alt={post.title}
            height="600"
            image={post.imgUrl}
          />
          <CardContent>
            <Box display="flex">
              <Avatar
                src={post.user.imgUrl}
                alt={post.user.name}
                sx={{
                  width: "80px !important",
                  height: "80px !important",
                  border: "1px solid black",
                  borderRadius: "0 !important",
                  marginRight: "1rem",
                }}
              />
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="left"
                >
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
                <Link
                  href={post.user.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                >
                  <Typography textAlign="left">{post.user.name}</Typography>
                </Link>
                <Typography textAlign="left">{post.user.category}</Typography>
                <Typography textAlign="left">{post.user.headline}</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography
              my="24px"
              gutterBottom
              variant="h3"
              component="div"
              align="left"
              className="title-height"
            >
              {post.title}
            </Typography>

            <Typography
              my="24px"
              gutterBottom
              variant="h6"
              component="div"
              align="left"
              className="title-height"
              dangerouslySetInnerHTML={{ __html: post.content }} // Use dangerouslySetInnerHTML
            />
          </CardContent>

          <Box mt={2}>
            {post.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{ backgroundColor: "#f5f5f5", marginRight: 1 }}
              />
            ))}
          </Box>

          <Divider sx={{ mt: 3 }} />
          <CardActionButtons post={post} />
        </Card>
      </Box>
      {isAuthor && (
        <CardActions className="crud-card" sx={{ maxWidth: 1200 }}>
          <IconButton onClick={handleEdit}>
            <EditIcon className="crud-btn" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon className="crud-btn" />
          </IconButton>
        </CardActions>
      )}
    </div>
  );
};

export default ArticlePage;
