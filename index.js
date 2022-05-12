import express from "express";
import usersRoutes from "./routes/userRoutes.js";

const app = express(); //app Objekt kennzeichnet die Express application; es hat Methoden für bspw. das Routen von http requests
const port = process.env.PORT || 5000;

const users = [
  { id: 1, userName: "Mario" },
  { id: 2, userName: "Philipp" },
  { id: 3, userName: "Matthias" },
];
//Middleware, die uns das eingehende request Objekt als JSON erkennen lässt
app.use(express.json());

//Middleware, die uns die users routes aus dem userRoutes Modul benutzen lässt
//app.use("/users", usersRoutes);

app
  .route("/")
  .get((req, res) =>
    res.send(
      "<h1>Willkommen auf unserer API</h1><h2>folgende Endpunkte sind verfügbar:</h2><p>/users -> alle User abrufen & neuen User hinzufügen</p><p>/users/:id -> einzelnen User abrufen, User löschen, User aktualisieren</p>"
    )
  );

//Endpunkte erstellen, der /users bzw /users/:id heißt und an denen wir alle CRUD Operations an einem User durchführen können

app
  .route("/users")
  .get((req, res) => res.status(200).json(users))
  .post((req, res) => {
    // console.log(req.body);
    const newUser = {
      id: req.body.id,
      userName: req.body.userName,
    };
    // console.log(newUser);
    users.push(newUser);
    // console.log(users);
    res.status(201).json(newUser);
  });

app
  .route("/users/:id")
  .get((req, res) => {
    //   console.log(req.params);
    const findUser = users.find((user) => user.id == req.params.id);
    if (findUser) {
      res.status(200).json(findUser);
    } else {
      res.status(404).send("User not found");
    }
  })
  .delete((req, res) => {
    const findUser = users.find((user) => user.id == req.params.id);
    const index = users.indexOf(findUser);
    // console.log(index);
    users.splice(index, 1);
    // console.log(users);
    res.status(200).send("User successfully deleted");
  })
  .put((req, res) => {
    const findUser = users.find((user) => user.id == req.params.id);
    // console.log(findUser);
    findUser.userName = req.body.userName;
    // console.log(findUser);
    res.status(200).json(findUser);
  });

app.all("*", (req, res) =>
  res
    .status(404)
    .send(
      "This is not a valid endpoint, please have a look at the documentation"
    )
);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
