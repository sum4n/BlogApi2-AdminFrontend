import { useState } from "react";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(title, content);
    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert(res.message);
        setTitle("");
        setContent("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1> Write new post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label> <br />
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />{" "}
        <br />
        <label htmlFor="content">Content:</label> <br />
        <textarea
          id="content"
          rows={"14"}
          cols={"60"}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>{" "}
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default NewPost;
