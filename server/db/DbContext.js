import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import BoardSchema from "../models/Board";


class DbContext {
  Profile = mongoose.model("Profile", ProfileSchema);
  Values = mongoose.model("Value", ValueSchema);
  Boards = mongoose.model("Board", BoardSchema)

}

export const dbContext = new DbContext();
