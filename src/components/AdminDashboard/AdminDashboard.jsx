import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { API_BASE } from "../../config";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useOutletContext();
  // console.log(user);

  useEffect(() => {
    if (user) {
      fetch(`${API_BASE}/api/admin/posts`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.posts);
          setPosts(res.posts);
        });
    }
  }, [user]);

  return (
    <>
      <p>Admin Dashboard</p>
      <Link to="/posts/new">Write a new post:</Link>
      <p>Posts:</p>
      <ul>
        {posts.map((post) => {
          return (
            <ListItem
              post={post}
              posts={posts}
              setPosts={setPosts}
              key={post.id}
            />
          );
        })}
      </ul>{" "}
    </>
  );
};

const ListItem = ({ post, setPosts, posts }) => {
  const [published, setPublished] = useState(post.published);

  function handlePublish(e, postId) {
    // console.log(published);
    // const value = e.target.checked;
    // console.log(value, postId);

    fetch(`${API_BASE}/api/posts/${postId}/publish`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
      body: JSON.stringify({ published: !post.published }),
    })
      .then((res) => res.json())
      .then(() => {
        setPublished(!published);
        // console.log("Published updated", data);
      })
      .catch((err) => {
        console.error("Failed to update publish status:", err);
      });
  }

  function handleDelete(e) {
    e.preventDefault();
    console.log(e.target.id);
    let confirmDelete = confirm("Do you really want to delete the post?");

    if (confirmDelete) {
      fetch(`${API_BASE}/api/posts/${e.target.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          // delete posts from react memory
          const newPosts = posts.filter((post) => {
            return post.id != e.target.id;
          });

          setPosts(newPosts);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <>
      <li>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
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
        <Link to={`/posts/${post.id}/edit`}>Edit</Link>
        <form id={post.id} onSubmit={handleDelete}>
          <br />
          <button type="submit">Delete</button>
        </form>
      </li>
      <hr />
    </>
  );
};

export default AdminDashboard;
