import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${postId}/comments`)
      .then(async (response) => {
        if (response.status >= 400) {
          const errorData = await response.json();
          throw new Error(errorData.error || `server error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setComments(data.allCommentsByPostId);
      })
      .catch((err) => setErrors(err))
      .finally(() => setLoading(false));
  }, [postId]);

  // console.log(comments);

  function handleDelete(e) {
    e.preventDefault();
    // console.log(e.target.id);
    let confirmDelete = confirm("Do you really want to delete it?");
    // console.log(confirmDelete);

    if (confirmDelete) {
      fetch(
        `http://localhost:3000/api/posts/${postId}/comments/${e.target.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then(() => {
          let updatedComments = comments.filter((comment) => {
            return comment.id != e.target.id;
          });

          setComments(updatedComments);
          // console.log(comments);
          // console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  // console.log(comments);
  if (loading) return <p>Loading...</p>;
  if (errors) return <p>{errors.message}</p>;

  return (
    <>
      <p>Comments:</p>
      {comments.length === 0 && <p>No comments yet...</p>}

      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>- {comment.author.email}</p>
              {/* id is for handlesubmit to pass comment id */}
              <form onSubmit={handleDelete} id={comment.id}>
                <button type="submit">Delete</button>
              </form>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Comments;
