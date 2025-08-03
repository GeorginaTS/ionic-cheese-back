import { Request, Response } from "express";
import worldCheesesModel, {WorldCheeseDocument}  from "../models/world-cheeses";

// GET /cheeses
export const getAllCheeses = async (req: Request, res: Response): Promise<void> => {
  try {
    const cheeses: WorldCheeseDocument[] = await worldCheesesModel.find();
    console.log("cheeses", cheeses);
    res.status(200).json(cheeses);
  } catch (error) {
    console.error("Error fetching cheeses:", error);
    res.status(500).json({ msg: "Error fetching cheeses", error });
  }
};

// GET /cheeses/:id
export const getOneCheese = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cheese: WorldCheeseDocument | null = await worldCheesesModel.findById(id);

    cheese
      ? res.status(200).json({ msg: "Cheese found", cheese })
      : res.status(404).json({ msg: "Cheese not found", id });
  } catch (error) {
    res.status(500).json({ msg: "Error getting cheese", error });
  }
};

// POST /cheeses
export const createCheese = async (req: Request, res: Response): Promise<void> => {
  try {
    const cheeseData: Partial<WorldCheeseDocument> = req.body;
    const newCheese: WorldCheeseDocument = await worldCheesesModel.create(cheeseData);
    res.status(201).json({ msg: "Cheese created", cheese: newCheese });
  } catch (error) {
    res.status(500).json({ msg: "Error creating cheese", error });
  }
};

// PUT /cheeses/:id
export const updateOneCheese = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData: Partial<WorldCheeseDocument> = req.body;

    const updatedCheese: WorldCheeseDocument | null = await worldCheesesModel.findByIdAndUpdate(id, updatedData, { new: true });

    updatedCheese
      ? res.status(200).json({ msg: "Cheese updated", cheese: updatedCheese })
      : res.status(404).json({ msg: "Cheese not found", id });
  } catch (error) {
    res.status(500).json({ msg: "Error updating cheese", error });
  }
};

// DELETE /cheeses/:id
export const deleteOneCheese = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCheese: WorldCheeseDocument | null = await worldCheesesModel.findByIdAndDelete(id);

    deletedCheese
      ? res.status(200).json({ msg: "Cheese deleted", cheese: deletedCheese })
      : res.status(404).json({ msg: "Cheese not found", id });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting cheese", error });
  }
};
