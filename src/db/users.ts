import mongoose from "mongoose";

// Define the user schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

// Create and export the user model
export const userModel = mongoose.model("User", UserSchema);

// Get all users
export const getUsers = () => userModel.find();

// Use lowercase `string` for TypeScript types instead of `String`
export const getUserByEmail = (email: string) => userModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
  userModel.findOne({ "authentication.sessionToken": sessionToken });

export const getUserById = (id: string) => userModel.findById(id);

// Use lowercase `string` for keys in Record types
export const createUser = (values: Record<string, any>) =>
  new userModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) =>
  userModel.findByIdAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  userModel.findByIdAndUpdate(id, values);

console.log("schema on fire 🎇");
