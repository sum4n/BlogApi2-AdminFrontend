import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditPost = () => {
  const { id } = useParams();
  // const [post, setPost] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.post);
        setTitle(data.post.title);
        setContent(data.post.content);
        // setPost(data.post);
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ title, content });
    setSuccessMsg("");
    setErrorMsg("");
    setValidationErrors("");

    fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          setSuccessMsg(res.message);
          setTitle("");
          setContent("");
        } else {
          if (res.error) {
            setValidationErrors(res.error);
          } else {
            setErrorMsg(res.message || "Failed to update the post");
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg("Something went wrong. Please try again.");
      });
  }

  return (
    <>
      <h1>Edit</h1>

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
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength={4}
          maxLength={200}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          id="content"
          rows={14}
          cols={60}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minLength={10}
        ></textarea>{" "}
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default EditPost;
