import React from "react";
import io, { Socket } from "socket.io-client";

type ChatType = "RECEIVE_MESSAGE";

type ChatMessage = {
  from: string;
  msg: string;
};

type ChatPayload = {
  topic: string;
} & ChatMessage;

type ChatState = {
  [key: string]: ChatMessage[];
};

export type ContextData = {
  allChats?: ChatState;
  sendChatAction?: typeof sendChatAction;
  user?: string;
};

const initialState: ChatState = {
  general: [
    { from: "nop", msg: "hello" },
    { from: "bunjiro", msg: "hello" },
    { from: "sataharu", msg: "hello" },
  ],
  topic2: [
    { from: "nop", msg: "hello" },
    { from: "dnakano", msg: "bonjour" },
    { from: "dhasegaw", msg: "good night" },
  ],
};

function reducer(
  state: ChatState,
  action: { type: ChatType; payload: ChatPayload }
): ChatState {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg,
          },
        ],
      };
    default:
      return state;
  }
}

let socket: Socket;

function sendChatAction(value: ChatPayload) {
  socket.emit("chat message", value);
}

export const CTX = React.createContext<ContextData>({});
// export const CTX = React.createContext<ContextData>({});

export default function Store({ children }: { children: React.ReactNode }) {
  if (!socket) {
    socket = io(":3000");
    socket.on("chat message", function (msg: ChatPayload) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  const [allChats, dispatch] = React.useReducer(reducer, initialState);
  const user = "user" + Math.random().toFixed(2);

  return (
    <>
      <CTX.Provider value={{ allChats, sendChatAction, user }}>
        {children}
      </CTX.Provider>
    </>
  );
}
