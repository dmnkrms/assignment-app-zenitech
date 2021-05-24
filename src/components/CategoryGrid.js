import React, { useState, useEffect } from "react";
import categoriesService from "../services/Categories";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";

import CategoryCard from "./CategoryCard";
import Popup from "./Popup";

const CardGrid = () => {
  const [categories, setCategories] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    categoriesService.getAll().then((data) => {
      setCategories(data);
    });
  }, []);

  const addCategory = (event) => {
    event.preventDefault();
    const newCategory = {
      name: newName,
    };

    categoriesService
      .create(newCategory)
      .then((data) => {
        setCategories(categories.concat(data));
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenPopup(false);
  };

  const deleteCategory = (name) => {
    if (window.confirm(`Do you really want to delete "${name}" category?`)) {
      categoriesService.deleteCategory(name).then(() => {
        setCategories(categories.filter((c) => c.name !== name));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item>
          <Typography
            variant="h6"
            color="textSecondary"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            Categories
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="small"
            color="primary"
            startIcon={<AddBoxIcon />}
            onClick={() => setOpenPopup(true)}
          >
            create new
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item key={category._id} md={3} sm={4} xs={12}>
            <CategoryCard category={category} deleteCategory={deleteCategory} />
          </Grid>
        ))}
      </Grid>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Create new category"
        type="category"
        handleNameChange={handleNameChange}
        onSubmit={addCategory}
      ></Popup>
    </div>
  );
};

export default CardGrid;
