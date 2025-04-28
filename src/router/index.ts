import express from "express";

import authentication from "./authentication";
const router = express.Router();
export default (): express.Router => {
  console.log("Setting up main router");
  authentication(router);
  console.log("route set up complete ");

  return router;
};
