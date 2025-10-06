import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};


app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const idNum = () => {
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  let id = "";
  for (let i = 0; i < 3; i++) {
    id += alpha.charAt(Math.floor(Math.random() * alpha.length));
  }
  for (let i = 0; i < 3; i++) {
    let num = Math.floor(Math.random() * 10);
    id += num.toString();
  }
  return id;
};

app.delete("/users", (req, res) => {
  const { id } = req.body;
  console.log(id);
  const index = users.users_list.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).send("Resource not found");
  }

  users.users_list.splice(index, 1);
  return res.status(204).send();
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  let id = idNum();
  while (findUserById(id) !== undefined) {
    id = idNum();
  }
  userToAdd.id = id;
  let user = addUser(userToAdd);
  if (user === undefined) {
    res.status(400).send("Failed to post")
  }
  res.status(201).send(JSON.stringify(userToAdd));
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});