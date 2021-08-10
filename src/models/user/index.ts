// libs
import { model, Schema, Types, _AllowStringsForIds } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
// plugins
import paginate from "@/plugins/pagination";
import toJSON from "@/plugins/toJSON";
// types
import { IUser, IUserModel } from "./type";
// others
import { roles } from "@/config/roles";

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error("Password must contain at least one letter and one number");
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.static({
  /**
   * Check if email is taken
   * @param {string} email - The user's email
   * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
   * @returns {Promise<boolean>}
   */
  async isEmailTaken(email: string, excludeUserId?: Types.ObjectId): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  },
});

userSchema.method({
  /**
   * Check if password matches the user's password
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async isPasswordMatch(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

/**
 * IUser model typed IUserModel instance
 */
const UserModel: IUserModel = model<IUser, IUserModel>("User", userSchema);

export default UserModel;
