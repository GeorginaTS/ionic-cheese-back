import { Request, Response } from "express";
import cheeseModel, { CheeseDocument } from "../models/cheeses";

// GET /cheeses

export const getAllCheeses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.uid; // ve del token Firebase
    const cheeses: CheeseDocument[] = await cheeseModel.find({ userId });
    console.log("Cheeses for user", userId, cheeses);
    res.status(200).json(cheeses);
  } catch (error) {
    console.error("Error fetching cheeses:", error);
    res.status(500).json({ msg: "Error fetching cheeses", error });
  }
};

// GET /cheeses/:id
export const getOneCheese = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.uid;
    const cheese: CheeseDocument | null = await cheeseModel.findOne({
      _id: id,
      userId, // només buscarà si el formatge pertany a l’usuari
    });

    cheese
      ? res.status(200).json({ msg: "Cheese found", cheese })
      : res.status(404).json({ msg: "Cheese not found", id });
  } catch (error) {
    res.status(500).json({ msg: "Error getting cheese", error });
  }
};

// POST /cheeses
export const createCheese = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.uid; // ve del middleware d’autenticació Firebase
    const cheeseData: Partial<CheeseDocument> = req.body;

    // Creem el formatge associat a l’usuari autenticat
    const newCheese: CheeseDocument = await cheeseModel.create({
      ...cheeseData,
      userId,  // assegurem que el camp sempre correspon a l’usuari connectat
    });

    res.status(201).json({ msg: "Cheese created", cheese: newCheese });
  } catch (error) {
    res.status(500).json({ msg: "Error creating cheese", error });
  }
};


// PUT /cheeses/:id
export const updateOneCheese = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.uid; // del middleware d’autenticació
    const updatedData: Partial<CheeseDocument> = req.body;

    const updatedCheese: CheeseDocument | null =
      await cheeseModel.findOneAndUpdate({ _id: id, userId }, updatedData, {
        new: true,
      });

    updatedCheese
      ? res.status(200).json({ msg: "Cheese updated", cheese: updatedCheese })
      : res.status(404).json({ msg: "Cheese not found", id });
  } catch (error) {
    res.status(500).json({ msg: "Error updating cheese", error });
  }
};

// DELETE /cheeses/:id
export const deleteOneCheese = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.uid; // del middleware

    const deletedCheese: CheeseDocument | null =
      await cheeseModel.findOneAndDelete({
        _id: id,
        userId, // només elimina si és propietat de l’usuari
      });

    deletedCheese
      ? res.status(200).json({ msg: "Cheese deleted", cheese: deletedCheese })
      : res.status(404).json({ msg: "Cheese not found", id });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting cheese", error });
  }
};
