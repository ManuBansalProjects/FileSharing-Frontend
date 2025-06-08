import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as FileServices from '../services/fileServices';

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ViewFile() {
  const { fileId } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [isreplying, setIsReplying] = useState(false);
  const defaultLayout = defaultLayoutPlugin();

  const getComments = async()=>{
    const response = await FileServices.GetFileComments(fileId);
    const commentsList = response?.data?.data?.comments;
    setComments(commentsList);
  }
  console.log(comments);
  const fetchPdfUrl = async () => {
    const response = await FileServices.GetSingleFile(fileId);
    const url = response?.data?.data?.file?.file_path;
    setPdfUrl(url);
  };

  useEffect(() => {
    getComments();
    fetchPdfUrl();
  }, [fileId]);


  const handleAddComment = async() => {
    try{
      if (newComment.trim()) {
        const data = {
          comment : newComment,
          file_id : fileId,
        }
        const response = await FileServices.AddComment(data);
        // const addedComment = response?.data?.data?.comment;
        // setComments([addedComment, ...comments]);
        setNewComment('');
        getComments();
      }
    }catch(error){

    }
  };

  const onReplying=(commentIndex)=>{
    setReplyComment('');
    setComments(prevComments => {
      return prevComments.map((comment, index)=>{
        return { ...comment, is_replying : index == commentIndex }
      })
    })
  }
  const handleReplyComment=async(commentId)=>{
     try{
      if (replyComment.trim()) {
        const data = {
          comment : replyComment,
          file_id : fileId,
          comment_id : commentId
        }
        const response = await FileServices.ReplyComment(data);
        // const addedComment = response?.data?.data?.comment;
        // setComments([addedComment, ...comments]);
        setReplyComment('');
        getComments();
      }
    }catch(error){

    }
  }
  const onDelete=async(commentId)=>{
     try{
        const data = {
          comment_id : commentId,
          file_id : fileId,
        }
        await FileServices.DeleteComment(data);
        getComments();
    }catch(error){

    }
  }
  const onReplyDelete=async(commentId, repliedCommentId)=>{
     try{
        const data = {
          comment_id : commentId,
          replied_comment_id : repliedCommentId,
          file_id : fileId,
        }
        await FileServices.DeleteRepliedComment(data);
        getComments();
    }catch(error){

    }
  }

  return <div className="view-file-container" style={{ display: 'flex', gap: '24px' }}>
    {/* PDF Viewer Section */}
    <div className="pdf-viewer" style={{ flex: 2 }}>
      {pdfUrl ? (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfUrl} plugins={[defaultLayout]} />
        </Worker>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>

    {/* Comment Sidebar */}
    <div className="comment-sidebar" style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '16px' }}>
      <h3>Comments</h3>

      <div className="comments-list" style={{ marginBottom: '16px' }}>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment, i) => (
            <div key={comment.comment_id} style={{ marginBottom: '24px' }}>
              {/* Main Comment */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4 style={{ margin: '0' }}>{comment.user_name}</h4>
                {/* Actions */}
                <span style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon
                    icon={faReply}
                    onClick={() => onReplying(i)}
                    style={{ marginRight: '8px', cursor: 'pointer' }}
                  />
                  {comment.user_id === JSON.parse(localStorage.getItem('user'))._id && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="lg"
                      color="red"
                      onClick={() => onDelete(comment.comment_id)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </span>
              </div>
              <p style={{ margin: '4px 0 0' }}>• {comment.comment}</p>

              {/* Reply Input */}
              {comment.is_replying && (
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '8px',
                    marginBottom: '8px',
                    alignItems: 'center',
                  }}
                >
                  <input
                    type="text"
                    value={replyComment}
                    onChange={(e) => setReplyComment(e.target.value)}
                    placeholder="Write a reply comment..."
                    aria-label="Reply comment input"
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      fontSize: '14px',
                    }}
                  />
                  <button
                    onClick={() => handleReplyComment(comment.comment_id)}
                    disabled={!replyComment.trim()}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: replyComment.trim() ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Reply
                  </button>
                </div>
              )}

              {/* Replied Comments */}
              <div style={{ paddingLeft: '16px', marginTop: '8px' }}>
                {comment.replied_comments?.map((repliedComment) => (
                  <div key={repliedComment.comment_id} style={{ marginBottom: '6px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <strong>{repliedComment.user_name}</strong>
                      {/* Actions */}
                      {repliedComment.user_id === JSON.parse(localStorage.getItem('user'))._id && (
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="sm"
                          color="red"
                          onClick={() => onReplyDelete(comment.comment_id, repliedComment.comment_id)}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
                    </div>
                    <p style={{ margin: '0', textAlign: 'right' }}>• {repliedComment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Comment */}
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          style={{
            width: '100%',
            minHeight: '60px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '8px',
          }}
        />
        <button
          onClick={handleAddComment}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add Comment
        </button>
      </div>
    </div>
  </div>
      
}

export default ViewFile;
