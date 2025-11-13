import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: { name: string, email: string, password: string } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(StatusCodes.OK).json({ user: newUser });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST)
      .json({ message: "Internal server error", error });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string, password: string } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid password" });
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST)
      .json({ message: "Internal server error", error });
  }
};

export { registerUser, loginUser };
