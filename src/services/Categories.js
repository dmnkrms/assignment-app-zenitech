import axios from "axios";
const baseUrl = "http://localhost:3001/api/categories";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const create = (category) => {
  const request = axios.post(baseUrl, category);
  return request.then((response) => response.data);
};

const getSales = (name) => {
  const request = axios.get(`${baseUrl}/${name}/sales`);
  return request.then((response) => response.data);
};

const deleteCategory = (name) => {
  const request = axios.delete(`${baseUrl}/${name}`);
  return request.then((response) => response.data);
};

export default { getAll, create, getSales, deleteCategory };
