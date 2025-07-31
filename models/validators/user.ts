import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserDocument } from "../users"; // Assumim que aquesta ruta és correcta

const SECRET = process.env.TOKEN_SECRET || "secret";

// ✅ Tipus per Request amb `user` injectat des del token
interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

// ✅ VALIDACIONS per crear/actualitzar usuari
export const validatorUser = [
  check("name")
    .exists({ checkFalsy: true }).withMessage("El nom és obligatori.")
    .isLength({ min: 3, max: 16 }).withMessage("Ha de tenir entre 3 i 16 caràcters."),

  check("email")
    .exists({ checkFalsy: true }).withMessage("El correu electrònic és obligatori.")
    .isEmail().withMessage("El correu electrònic no és vàlid."),

  check("password")
    .exists({ checkFalsy: true }).withMessage("La contrasenya és obligatòria."),

  check("profile")
    .exists({ checkFalsy: true }).withMessage("El perfil és obligatori."),

  // Middleware per retornar errors si n’hi ha
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  }
];

// ✅ AUTENTICACIÓ amb JWT i tipatge fort
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ msg: "Token not provided" });
    return;
  }

  jwt.verify(token, SECRET, (err, decoded: any) => {
    if (err) {
      res.status(403).json({ msg: "Invalid token" });
    } else {
      req.user = decoded.user as UserDocument;
      next();
    }
  });
};
