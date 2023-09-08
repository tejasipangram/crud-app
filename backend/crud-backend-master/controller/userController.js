import { List } from "../model/List.js";

export const getUsers = async (req, res) => {
  try {
    const users = await List.distinct("email");

    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong " });
  }
};
