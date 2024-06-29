import express from "express";

const app = express();
const mockUsers = [
  { id: 1, username: "jack", displayName: "Yakob" },
  { id: 2, username: "jhone", displayName: "Yohannes" },
  { id: 3, username: "adma", displayName: "Adamu" },
];

const mockProducts = [
  { id: 123, name: "Doro Wat", price: 15.0 },
  { id: 124, name: "Kitfo", price: 18.5 },
  { id: 125, name: "Shiro", price: 12.0 },
  { id: 126, name: "Tibs", price: 17.0 },
  { id: 127, name: "Injera", price: 5.0 },
  { id: 128, name: "Firfir", price: 14.0 },
  { id: 129, name: "Gomen", price: 10.0 },
  { id: 130, name: "Kolo", price: 8.0 },
];

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello" });
});

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  // when filter and value are undefined
  // if (!filter && !value) 
  // if both filter and value exists
  let filteredUser = [];
  if (filter && value) {
    filteredUser = mockUsers.filter((user) => {
      if (user.hasOwnProperty(filter)) {
        return user[filter].toString().includes(value.toString());
      }
    });
    return res.send(filteredUser);
  }
  return res.send(mockUsers);
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.status(400).send({ msg: "Bad request Invalid Id" });
  }
  const user = mockUsers.find((user) => {
    return user.id === parsedId;
  });

  if (user) return res.status(200).send({ user });
  res.sendStatus(404);
});

app.get("/api/products", (req, res) => {
  res.status(200).send(mockProducts);
});
app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.status(400).send({ msg: "Bad request Invalid Id" });
  }
  const product = mockProducts.find((product) => product.id === parsedId);
  if (product) return res.status(200).send({ product });
  res.sendStatus(404);
});
export default app;
