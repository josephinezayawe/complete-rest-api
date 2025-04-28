import express from "express";
import { logIn, register } from "../controllers/authentication";

export default (router: express.Router) => {
  console.log(" Setting up /auth/register route");
  router.post("/auth/register", register);
  router.post("/auth/login", logIn);
};
