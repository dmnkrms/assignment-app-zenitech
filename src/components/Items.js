import React, { useState, useEffect } from "react";

import itemsService from "../services/Items";

import Popup from "./Popup";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";

const Items = (props) => {
  const { categoryItems, getSales, root } = props;
  const [items, setItems] = useState(categoryItems);
  const [openPopup, setOpenPopup] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSales, setNewSales] = useState(0);

  const addItem = (event) => {
    event.preventDefault();

    const newItem = {
      name: newName,
      root: root,
      value: Number(newSales),
    };

    itemsService
      .addItem(newItem)
      .then((data) => {
        setItems(items.concat(data));
        getSales();
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenPopup(false);
  };

  const deleteItem = (name, root) => {
    if (
      window.confirm(
        `Do you really want to delete "${name}" item in "${root}" category?`
      )
    ) {
      itemsService.deleteItem(name, root).then(() => {
        setItems(items.filter((i) => i.name !== name));
      });
      getSales();
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleSalesChange = (event) => {
    setNewSales(event.target.value);
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem key={`${item.name}${item.root}`}>
          <Grid container spacing={1} justify="flex-start" alignItems="center">
            <Grid item>
              <ListItemText primary={item.name} />
            </Grid>
            <Grid item>
              <ListItemText primary={item.value} />
            </Grid>
          </Grid>
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteItem(item.name, item.root)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      <Grid container style={{ marginTop: "12px" }} justify="center">
        <Grid item>
          <Button color="primary" onClick={() => setOpenPopup(true)}>
            Add item
          </Button>
        </Grid>
      </Grid>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add new item"
        type="item"
        handleNameChange={handleNameChange}
        handleSalesChange={handleSalesChange}
        onSubmit={addItem}
        data-testid="popUp"
      ></Popup>
    </List>
  );
};

export default Items;
