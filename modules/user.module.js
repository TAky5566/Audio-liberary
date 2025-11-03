import mongoose from "mongoose";

let UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (val) => {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
        },
        message: "Email is not valid",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      /* validate: {
        validator: (val) => {
          return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
            val
          );
        },
        message:
          "Password must contain at least one number or special character and from length between 6 - 16",
      },
      /**
       * how to custom more ,status and feild
       * relock for reg
       */
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    audios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "audio",
      },
    ],
    resetPassword: {
      expiredIn: Date,
      token: String,
    },
    VerifyState: {
      isSent: {
        type: Boolean,
        default: false,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      VerifyToken: {
        type: String,
        default: null,
      },
      lastSend: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true }
);

export let UserModel = mongoose.model("User", UserSchema);

let AudioSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    genre: {
      type: String,
      required: true,
      enum: ["mp3", "wav", "ogg"],
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
    },
  },
  { timestamps: true }
);
export const AudioModel = mongoose.model("Audio", AudioSchema);
