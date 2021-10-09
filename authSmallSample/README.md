### How to try this sample

clone and move to directory
```
$ git clone https://github.com/dai65527/pong-prototypes.git
$ cd authSmallSample
```

install modules.
```
$ git clone https://github.com/dai65527/pong-prototypes.git
$ cd authSmallSample
$ npm ci
```

create `.env` with valid 42api auth token like below to set secret value for 42API access.
(for members: ask dnakano for valid .env file)
```
FTAPI_UID=56789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234
FTAPI_SECRET=def0123456789abcdef0123456789abcdef0123456789abcdef0123456789abc
```

start server.
```
$ node app.js
```

then, access to http://localhost:3000.
(loginid: `user`、password: `pass`)
