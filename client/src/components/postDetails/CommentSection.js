import React, { useState, useRef, useEffect } from "react"
import { Typography, TextField, Button } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { commentPost } from "../../slices/postsSlice"

import useStyles from "./styles"

const CommentSection = ({ post }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const user = JSON.parse(localStorage.getItem("profile"))

  useEffect(() => {
    setComments(post.comments)
  }, [post])

  const handleClick = () => {
    const finalComment = `${user?.result?.given_name}: ${comment}`

    dispatch(commentPost({ finalComment, id: post._id }))
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((com, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {com}
            </Typography>
          ))}
        </div>
        {user?.result?.given_name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection
