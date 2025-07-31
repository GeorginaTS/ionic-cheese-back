
import { Request, Response } from "express";
import usersModel, { UserDocument } from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_TOKEN = process.env.TOKEN_SECRET || "secret";
const SALT_ROUNDS = 10;

// Utils
const hashPassword = async (plainPassword: string | Buffer): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plainPassword.toString(), salt);
};

// Controllers

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: UserDocument[] = await usersModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching users", error });
  }
};

export const getOneUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user: UserDocument | null = await usersModel.findById(id);

    user
      ? res.status(200).json({ msg: "User found", user })
      : res.status(404).json({ msg: "User not found", id });
  } catch (error) {
    res.status(500).json({ msg: "Error getting user", error });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = req.body as Partial<UserDocument>;

    // Comprovem si ja existeix un usuari amb aquest email
    const existingUser = await usersModel.findOne({ email: userData.email });
    if (existingUser) {
      res.status(409).json({ msg: "Email ja registrat" });
      return;
    }

    userData.password = await hashPassword(userData.password!);
    const newUser: UserDocument = await usersModel.create(userData);
    res.status(201).json({ msg: "User created", user: newUser });
  } catch (error) {
    res.status(500).json({ msg: "Error creating user", error });
  }
};

export const updateOneUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body as Partial<UserDocument>;

    if (updatedData.password) {
      updatedData.password = await hashPassword(updatedData.password);
    }

    const updatedUser: UserDocument | null = await usersModel.findByIdAndUpdate(id, updatedData, { new: true });

    updatedUser
      ? res.status(200).json({ msg: "User updated", user: updatedUser })
      : res.status(404).json({ msg: "User not found", id });
  } catch (error) {
    res.status(500).json({ msg: "Error updating user", error });
  }
};

export const deleteOneUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser: UserDocument | null = await usersModel.findByIdAndDelete(id);

    deletedUser
      ? res.status(200).json({ msg: "User deleted", user: deletedUser })
      : res.status(404).json({ msg: "User not found", id });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user", error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user: UserDocument | null = await usersModel.findOne({ email });

    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ msg: "Incorrect password" });
      return;
    }

    const token = jwt.sign({ user }, SECRET_TOKEN, { expiresIn: "1h" });
    res.status(200).json({ msg: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ msg: "Error during login", error });
  }
};

export const userPage = (req: Request, res: Response): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ msg: "No token provided" });
    return;
  }

  jwt.verify(token, SECRET_TOKEN, (err, decoded: any) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid token" });
    }

    res.status(200).json({ msg: "User authenticated", user: decoded.user });
  });
};
