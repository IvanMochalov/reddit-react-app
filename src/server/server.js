import express from "express";
import ReactDOM from "react-dom/server";
import { indexHtmlTemplate } from "./indexHtmlTemplate";
import { App } from "../App";
import axios from 'axios';
import { params, PORT, IS_DEV, IS_PROD } from './../variables';
import compression from 'compression';
import helmet from 'helmet';

const app = express();

if (IS_PROD) {
  app.use(compression());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
}

app.use("/static", express.static("./dist/client"));

app.get("/auth", (req, res) => {
  axios.post(
    'https://www.reddit.com/api/v1/access_token',
    `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${params.REDIRECT}`,

    {
      auth: { username: params.CLIENT_ID, password: params.SECRET },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  )
  .then(({ data }) => {
    res.send(
      indexHtmlTemplate(ReactDOM.renderToString(App()), data['access_token']),
      );
  })
  .catch(console.log)
});

app.get("*", (req, res) => {
  res.send(indexHtmlTemplate(ReactDOM.renderToString(App())));
});

app.listen(PORT, () => {
  console.log(`server started on port http://localhost:${PORT}`);
});
