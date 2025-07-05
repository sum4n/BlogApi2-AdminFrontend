import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.posts);
        setPosts(res.posts);
      });
  }, []);

  return (
    <>
      <p>
        <>Admin Dashboard</>
      </p>
      <p>Posts:</p>
      <ul>
        {posts.map((post) => {
          return <ListItem post={post} key={post.id} />;
        })}
      </ul>
    </>
  );
};

const ListItem = ({ post }) => {
  const [published, setPublished] = useState(post.published);

  function handlePublish(e, postId) {
    console.log(published);
    // const value = e.target.checked;
    // console.log(value, postId);

    fetch(`http://localhost:3000/api/posts/${postId}/publish`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
      body: JSON.stringify({ published: !post.published }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPublished(!published);
        console.log("Published updated", data);
      })
      .catch((err) => {
        console.error("Failed to update publish status:", err);
      });
  }

  return (
    <>
      <li>
        <p>{post.title}</p>
        <p>{post.content}</p>
        <form>
          <label htmlFor="post-published">Published</label>
          <input
            type="checkbox"
            id="post-published"
            name="post-published"
            value={post.published.toString()}
            checked={published}
            onChange={(e) => handlePublish(e, post.id)}
          />
        </form>
      </li>
    </>
  );
};

export default AdminDashboard;
