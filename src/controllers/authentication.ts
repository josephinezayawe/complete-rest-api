import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";

export const logIn = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    console.log("got user");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const expectedHash = authentication(
      user.authentication?.salt || "",
      password
    );
    console.log("got hash");

    if (expectedHash !== user.authentication?.password) {
      return res.status(403).json({ message: "Invalid credentials" });
    }
    console.log("passed");

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("yozefu-auth", user.authentication.sessionToken, {
      httpOnly: true, // 🔥 Important: protect cookie from client-side JS
      domain: "localhost", // for development; change it for production
      path: "/",
      secure: false, // Set to true if you're using HTTPS
      sameSite: "lax", // Good basic CSRF protection
    });

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    console.log("Received registration data:", req.body);

    if (!email || !password || !username) {
      return res
        .sendStatus(400)
        .json({ error: "All fields are required please" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.log("none2");
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    console.log("user created");

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);

    return res.sendStatus(400);
  }
};
console.log("controller on");
