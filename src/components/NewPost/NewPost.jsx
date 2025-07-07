import { useState } from "react";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(title, content);

    setSuccessMsg("");
    setErrorMsg("");
    setValidationErrors([]);

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
        if (res.success) {
          setSuccessMsg(res.message);
          setTitle("");
          setContent("");
        } else {
          if (res.error) {
            setValidationErrors(res.error);
          } else {
            setErrorMsg(res.message || "Failed to create post.");
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg("Something went wrong. Please try again.");
      });
  };

  return (
    <>
      <h1> Write new post</h1>

      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {validationErrors.length > 0 && (
        <ul style={{ color: "red" }}>
          {validationErrors.map((err, i) => (
            <li key={i}>{err.msg}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label> <br />
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          minLength={4}
          max={200}
        />{" "}
        <br />
        <label htmlFor="content">Content:</label> <br />
        <textarea
          id="content"
          rows={"14"}
          cols={"60"}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          required
          minLength={10}
        ></textarea>{" "}
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default NewPost;
