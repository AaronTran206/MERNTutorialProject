import React, { useEffect } from "react"
import { Pagination, PaginationItem } from "@mui/material"
import { Link } from "react-router-dom"
import { fetchPost } from "../../slices/postsSlice"
import { useDispatch, useSelector } from "react-redux"

import useStyles from "./styles"

const Paginate = ({ page }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { numberOfPages, currentPage } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchPost(page))
  }, [page])

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      style={{ padding: "5px 0px", margin: "5px 0px" }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    ></Pagination>
  )
}

export default Paginate
