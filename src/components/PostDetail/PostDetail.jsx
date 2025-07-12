import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Comments from "../Comments/Comments";

const PostDetail = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.post);
        setPost(data.post);
      });
  }, [id]);

  function handleDelete(e) {
    e.preventDefault();
    console.log(e.target.id);
    let confirmDelete = confirm("Do you really want to delete the post?");

    if (confirmDelete) {
      fetch(`http://localhost:3000/api/posts/${e.target.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          navigate("/");
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <>
      <h1>Post Detail:</h1>
      <p>Title: {post.title}</p>
      <p>Content: {post.content}</p>
      <p>Published: {JSON.stringify(post.published)}</p>
      <p>Created: {post.createdAt}</p>
      <p>Updated: {post.updatedAt}</p>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      <form id={post.id} onSubmit={handleDelete}>
        <br />
        <button type="submit">Delete</button>
      </form>
      <hr />
      <Comments postId={id} />
    </>
  );
};

export default PostDetail;
