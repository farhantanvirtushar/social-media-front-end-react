import React from "react";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { TextField } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import axios from "axios";
import { useHistory } from "react-router";

import { getUser } from "../User";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CreatePost() {
  const classes = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);
  const [status, setStatus] = useState("");

  const user = getUser();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const updateStatus = async () => {
    const postData = { userID: user._id, description: status, image: "" };
    try {
      const res = await axios.post("/api/posts", postData);
      window.location.reload();
    } catch (error) {}
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src="https://lumiere-a.akamaihd.net/v1/images/ef91b3eba7549321e53d2c6a18b752a9cf5d2637.jpeg?"
          ></Avatar>
        }
        title={user.firstname + " " + user.lastname}
        subheader={new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(Date.now())}
      />

      <CardContent>
        <form className={classes.form} noValidate>
          <TextField
            name="status"
            variant="standard"
            multiline
            required
            fullWidth
            id="status"
            placeholder="What's on your mind?"
            autoFocus
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          />
        </form>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <CameraAltIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={updateStatus}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
