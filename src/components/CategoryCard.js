import React, { useState, useEffect } from "react";

import categoriesService from "../services/Categories";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import Items from "./Items";

const CategoryCard = ({ category, deleteCategory }) => {
  const [sales, setSales] = useState([]);

  const getSales = () => {
    categoriesService.getSales(category.name).then((data) => {
      setSales(data);
    });
  };
  useEffect(() => {
    getSales();
  }, [getSales]);

  return (
    <Card>
      <CardHeader
        action={
          <IconButton onClick={() => deleteCategory(category.name)}>
            <CloseIcon />
          </IconButton>
        }
        title={category.name}
        subheader={`Sales: ${sales}`}
        data-testid="cardheader"
      />
      <CardContent>
        <Items
          categoryItems={category.adjacents}
          getSales={getSales}
          root={category.name}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
