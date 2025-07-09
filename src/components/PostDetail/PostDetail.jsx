import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostDetail = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.post);
        setPost(data.post);
      });
  }, [id]);

  return (
    <>
      <h1>Post Detail:</h1>
      <p>Title: {post.title}</p>
      <p>Content: {post.content}</p>
      <p>Published: {JSON.stringify(post.published)}</p>
      <p>Created: {post.createdAt}</p>
      <p>Updated: {post.updatedAt}</p>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
    </>
  );
};

export default PostDetail;
