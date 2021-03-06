import React from "react";
import { rootContext } from "../AppRoot";
import { chatDataContext, chatServiceContext } from "./ChatApp";

const DashBoard: React.FC = () => {
  const { name } = React.useContext(rootContext);
  const chatData = React.useContext(chatDataContext);
  const chatService = React.useContext(chatServiceContext);

  const [msg, updateMsg] = React.useState("");

  return (
    <div>
      <h1>Chat</h1>
      <h2>Hello, {name}!</h2>
      <div>
        {chatData.messages.map((message, i) => {
          return <p key={i}>{`${message.sender}: ${message.message}`}</p>;
        })}
      </div>
      <div>
        <input
          type="text"
          value={msg}
          onChange={(e) => {
            updateMsg(e.target.value);
          }}
        />
        <button
          onClick={() => {
            chatService.sendNewMessage({ sender: name, message: msg });
            updateMsg("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default DashBoard;
