import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { v4 as uuidv4 } from "uuid";
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function HolidayComments({ holiday }) {
  const { user } = useAuthContext();
  const [newComment, setNewComment] = useState("");
  const { updateDocument, response } = useFirestore("holidays");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: uuidv4(),
    };
    await updateDocument(holiday.id, {
      comments: [...holiday.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="holiday-comments">
      <h4>Holiday Comments</h4>
      <ul>
        {holiday.comments.length > 0 &&
          holiday.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
}
