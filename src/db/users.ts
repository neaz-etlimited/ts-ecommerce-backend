import mongoose, { Document, Schema, Model } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  authentication: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
}

const userSchema: Schema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  "User",
  userSchema
);

export const getUser = (): Promise<IUser[]> => UserModel.find().exec();
export const getUserByEmail = (email: string): Promise<IUser | null> =>
  UserModel.findOne({ email }).exec();
export const getUserBySessionToken = (
  sessionToken: string
): Promise<IUser | null> =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken }).exec();
export const getUserById = (id: string): Promise<IUser | null> =>
  UserModel.findById(id).exec();
export const createUser = (values: Partial<IUser>): Promise<IUser> =>
  new UserModel(values).save().then((user) => user.toObject() as IUser);
export const deleteUserById = (id: string): Promise<IUser | null> =>
  UserModel.findByIdAndDelete(id).exec();
export const updateUserById = (
  id: string,
  values: Partial<IUser>
): Promise<IUser | null> =>
  UserModel.findByIdAndUpdate(id, values, { new: true }).exec();
