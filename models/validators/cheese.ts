import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Middleware de validació
export const validatorCheese = [
  check("name")
    .exists({ checkFalsy: true }).withMessage("El nom és obligatori.")
    .isLength({ min: 3, max: 16 }).withMessage("El nom ha de tenir entre 3 i 16 caràcters."),

  check("userId")
    .exists({ checkFalsy: true }).withMessage("El userId és obligatori.")
    .isMongoId().withMessage("El userId ha de ser un ID de Mongo vàlid."),

  check("date")
    .exists({ checkFalsy: true }).withMessage("La data és obligatòria.")
    .isISO8601().toDate().withMessage("La data ha de tenir un format vàlid."),

  check("status")
    .exists({ checkFalsy: true }).withMessage("L'estat és obligatori.")
    .isIn(['Per fer', 'Fent', 'Madurant', 'Fet', 'Consumint', 'Menjat'])
    .withMessage("L'estat no és vàlid."),

  check("milk_type")
    .exists({ checkFalsy: true }).withMessage("El tipus de llet és obligatori."),

  check("milk_quantity")
    .exists({ checkFalsy: true }).withMessage("La quantitat de llet és obligatòria.")
    .isNumeric().withMessage("La quantitat ha de ser un número."),

  check("public")
    .exists({ checkFalsy: true }).withMessage("El camp public és obligatori.")
    .isBoolean().withMessage("Public ha de ser true o false."),

  // Middleware d'errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

