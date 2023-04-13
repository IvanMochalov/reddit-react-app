import express from "express";
import ReactDOM from "react-dom/server";
import { indexHtmlTemplate } from "./indexHtmlTemplate";
import { App } from "../App";
import axios from 'axios';

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/static", express.static("./dist/client"));

app.get("/auth", (req, res) => {
  axios.post(
    'https://www.reddit.com/api/v1/access_token',
    `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${process.env.REDIRECT}`,
    {
      auth: { username: process.env.CLIENT_ID, password: process.env.SECRET },
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
