import express from "express";
import cors from "cors";
import services from "./user-services.js";

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


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  services.getUsers(name, job)
    .then(users => {
      res.json(users); 
    })
    .catch(error => {
      res.status(404).send("Resource not found.");
    });
});

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

app.delete("/users/:id", (req, res) => { 
  const id = req.params.id;  
  
  services.deleteUser(id)
    .then(deletedUser => res.status(204).send())
    .catch(error => res.status(404).send("Resource not found"));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  
  services.addUser(userToAdd)
    .then(savedUser => {
      res.status(201).json(savedUser);
    })
    .catch(error => {
      res.status(400).send("Failed to post");
    });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
