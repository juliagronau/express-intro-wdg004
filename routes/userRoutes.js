import express from "express";
import { getAllUsers } from "../controllers/userControllers.js"; //den Controller importieren (ist nicht default export daher mit {})

const usersRoutes = express.Router(); //Erstellt ein Router Object für die usersRoutes

//"/" entspricht dem Endpunkt /users --> siehe index.js Zeile 17, und ruft den getAllUsers Controller aus dem userControllers.js File auf
usersRoutes.get("/", getAllUsers);

export default usersRoutes;
