import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    address: {
      type: Array,
      // required: [true, 'Please provide an address'],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    userType: {
      type: String,
      required: [true, "Please provide a userType"],
      default: "admin",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    answer: {
      type: String,
      required: [true, "Please provide an answer"],
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

// export model
const User = mongoose.model("User", userSchema);

export default User
