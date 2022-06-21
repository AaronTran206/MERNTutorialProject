import { makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
  loadingIcon: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    margin: "5rem 0rem",
  },
}))
