import { Request, Response } from "express";
import cheeseModel, { CheeseDocument } from "../models/cheeses";

// GET /cheeses
export const getAllCheeses = async (req: Request, res: Response): Promise<void> => {
  try {
    const cheeses: CheeseDocument[] = await cheeseModel.find();
    res.status(200).json(cheeses);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching cheeses", error });
  }
};

// GET /cheeses/:id
export const getOneCheese = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cheese: CheeseDocument | null = await cheeseModel.findById(id);

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
    const cheeseData: Partial<CheeseDocument> = req.body;
    const newCheese: CheeseDocument = await cheeseModel.create(cheeseData);
    res.status(201).json({ msg: "Cheese created", cheese: newCheese });
  } catch (error) {
    res.status(500).json({ msg: "Error creating cheese", error });
  }
};

// PUT /cheeses/:id
export const updateOneCheese = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData: Partial<CheeseDocument> = req.body;

    const updatedCheese: CheeseDocument | null = await cheeseModel.findByIdAndUpdate(id, updatedData, { new: true });

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
    const deletedCheese: CheeseDocument | null = await cheeseModel.findByIdAndDelete(id);

    deletedCheese
      ? res.status(200).json({ msg: "Cheese deleted", cheese: deletedCheese })
      : res.status(404).json({ msg: "Cheese not found", id });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting cheese", error });
  }
};
