import { makeStyles } from "@material-ui/core"

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row !important",
    justifyContent: "center",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    margin: "0rem 2rem",
  },
  heading: {
    color: "rgba(0,183,255,1)",
    textDecoration: "none",
  },
}))
