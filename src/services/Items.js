import axios from "axios";
const baseUrl = "http://localhost:3001/api/items";

// body.root, body.name, body.value
const addItem = (item) => {
  const request = axios.post(baseUrl, item);
  return request.then((response) => response.data);
};

const deleteItem = (name, root) => {
  const request = axios.delete(`${baseUrl}/${name}/${root}`);
  return request.then((response) => response.data);
};

export default { addItem, deleteItem };
