import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([
  ]);

function updateList(person) { 
  console.log(person);
    postUser(person)
      .then(response => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCharacters([...characters, data])
      })
      .catch((error) => {
        console.log(error);
      });
}

function deleteUser(id) {
  return fetch(`http://localhost:8000/users/${id}`, {method: "DELETE",});
}


function removeOneCharacter(index) {
  const id = characters[index]._id;  
  deleteUser(id)
    .then(res => {
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      setCharacters(prev => prev.filter((_, i) => i !== index));
    })
    .catch(console.error);
}

function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

useEffect(() => {
  fetchUsers()
    .then((res) => res.json())
    .then((json) => setCharacters(json))
    .catch((error) => { console.log(error); });
}, [] );

function postUser(person) {
  const promise = fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}

return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
);
}

export default MyApp;