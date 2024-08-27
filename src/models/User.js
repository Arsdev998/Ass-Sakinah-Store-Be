import { Schema, model } from "mongoose";
import  passportLocalMongoose  from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required:true },
    password: { type: String },
    hash: { type: String },
    salt: { type: String },
    role: { type: String, default: "user" },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

export default model("user", userSchema);
