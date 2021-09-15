import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
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
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { getUser } from "../User";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    marginLeft: "auto",
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

const getProfile = async (setProfile, props) => {
  const res = await axios.get("/api/users/" + props.post.userID);

  setProfile(res.data);
};

export default function Post(props) {
  let user = getUser();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);
  const [profile, setProfile] = useState(null);

  const Like = async () => {
    await axios.put("/api/posts/" + props.post._id + "/like", {
      userID: user._id,
    });
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }

    setLiked(!liked);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getProfile(setProfile, props);
    if (props.post.likes.find((item) => item == user._id)) {
      setLiked(true);
    }
    setLikeCount(props.post.likes.length);
  }, []);
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
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          profile == null ? "" : profile.firstname + " " + profile.lastname
        }
        subheader={new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date(props.post.createdAt))}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.post.description}
        </Typography>
      </CardContent>

      {props.post.image == "" ? (
        <></>
      ) : (
        <CardMedia className={classes.media} image={props.post.image} />
      )}

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={Like}>
          <FavoriteIcon style={{ color: liked ? "red" : "gray" }} />
        </IconButton>
        <Typography>{likeCount}</Typography>
        {/* <IconButton
          className={classes.expand}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ChatBubbleIcon />
        </IconButton> */}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
}
