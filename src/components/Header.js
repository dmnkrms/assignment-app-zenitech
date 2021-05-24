import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StoreIcon from "@material-ui/icons/Store";
import Divider from "@material-ui/core/Divider";

const Header = () => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
        style={{ marginBottom: "2%" }}
      >
        <Grid item>
          <StoreIcon style={{ height: "80px", width: "80px" }} />
        </Grid>
        <Grid item>
          <Typography variant="h3">Store</Typography>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};

export default Header;
