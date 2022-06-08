import { makeStyles } from "@material-ui/core"

export default makeStyles((theme) => ({
  image: {
    marginLeft: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
}))
