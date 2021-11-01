import { useRef } from "react";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { io, Socket } from "socket.io-client";

type Payload = {
  message: string;
  unixTimeMili: number;
};

export default function WStest() {
  const [unixTimeMili, updateUnixTimeMili] = useState<number>(0);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    console.log("connecting");
    socketRef.current = io("http://localhost:4000/time");
    socketRef.current.on("msgToClient", (payload: Payload) => {
      updateUnixTimeMili(payload.unixTimeMili);
    });
    return () => {
      console.log("disconnecting");
      socketRef?.current?.disconnect();
    };
  }, []);

  return (
    <div>
      <NavBar>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h2" sx={{ marginBottom: 3 }}>
            WS test
          </Typography>
          <Typography variant="h6">UnixTime mili sec from ws server</Typography>
          <Typography variant="body1">
            {unixTimeMili === 0 ? "waiting for connection" : unixTimeMili}
          </Typography>
        </Grid>
      </NavBar>
    </div>
  );
}
