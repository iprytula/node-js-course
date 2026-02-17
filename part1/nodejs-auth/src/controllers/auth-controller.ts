import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

interface RegisterRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
    role?: "user" | "admin";
  };
}

interface LoginRequest extends Request {
  body: {
    username?: string;
    email?: string;
    password: string;
  };
}

interface AuthResponse extends Response {
  json(data: {
    message?: string;
    user?: Partial<IUser>;
    token?: string;
    error?: any;
  }): this;
}

export interface ChangePasswordRequest extends Request {
  body: {
    currentPassword: string;
    newPassword: string;
  };
  userInfo?: JwtPayload & {
    role: string;
  };
}

const registerUser = async (req: RegisterRequest, res: AuthResponse) => {
  try {
    const { username, email, password, role = "user" } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User with this username or email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || "secret-key",
      { expiresIn: "1h" }
    );

    return res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      user: userResponse,
      token
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error during registration",
      error: process.env.NODE_ENV === "development" ? error : {}
    });
  }
};

const loginUser = async (req: LoginRequest, res: AuthResponse) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Username or email is required"
      });
    }

    const user = await User.findOne({
      $or: [
        ...(username ? [{ username }] : []),
        ...(email ? [{ email }] : [])
      ]
    });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid credentials"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }, process.env.JWT_SECRET || "secret-key", { expiresIn: "1h" });

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    return res.status(StatusCodes.OK).json({
      message: "Login successful",
      user: userResponse,
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error during login",
      error: process.env.NODE_ENV === "development" ? error : {}
    });
  }
};

const changePassword = async (req: ChangePasswordRequest, res: Response) => {
  try {
    const loggedInUser = await User.findById(req.userInfo!.id);
    if (!loggedInUser) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized"
      });
    }

    const { currentPassword, newPassword } = req.body;

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, loggedInUser.password);
    if (!isCurrentPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Current password is incorrect"
      });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = hashedNewPassword;
    await loggedInUser.save();
    return res.status(StatusCodes.OK).json({
      message: "Password changed successfully"
    });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error during password change",
      error: process.env.NODE_ENV === "development" ? error : {}
    });
  }
};

const logOutUser = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  return res.status(StatusCodes.OK).json({
    message: "Logout successful"
  });
};

export { registerUser, loginUser, changePassword, logOutUser };