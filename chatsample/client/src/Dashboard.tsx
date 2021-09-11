import React from "react";
import { Paper, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { ContextData, CTX } from "./Store";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid gray",
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px",
  },
  chatBox: {
    width: "85%",
  },
  button: {
    width: "15%",
  },
  chip: {},
  textField: {},
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();

  // CTX store
  const { allChats, sendChatAction, user } = React.useContext(CTX);

  const topics = allChats ? Object.keys(allChats) : [];

  // local state
  const [activeTopic, changeActivetTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState("");

  return (
    <div>
      <Paper className={classes.root}>
        <h1>Chat app</h1>
        <p>{activeTopic}</p>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map((topic) => (
                <ListItem
                  onClick={() => {
                    changeActivetTopic(topic);
                  }}
                  key={topic}
                  button
                >
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats ? allChats[activeTopic].map((chat, i) => (
              <div className={classes.flex} key={i}>
                <Chip label={chat.from} className={classes.chip} />
                <p>{chat.msg}</p>
              </div>
            ))
          : <div>Loading...</div>}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            className={classes.chatBox}
            label="Send a chat"
            value={textValue}
            onChange={(event) => changeTextValue(event.target.value)}
          />
          <Button
            onClick={() => {
              if (!sendChatAction) {
                return;
              }
              sendChatAction({
                from: user!,
                msg: textValue!,
                topic: activeTopic!,
              });
              changeTextValue("");
            }}
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};
export default Dashboard;
