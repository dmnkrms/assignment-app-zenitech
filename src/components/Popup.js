import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";

import React from "react";

const Popup = (props) => {
  const {
    title,
    type,
    onSubmit,
    newName,
    newSales,
    handleNameChange,
    handleSalesChange,
    openPopup,
    setOpenPopup,
  } = props;

  return (
    <Dialog open={openPopup} fullWidth={true} maxWidth={"xs"}>
      <form onSubmit={onSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          <Grid
            container
            justify="center"
            spacing={3}
            direction="column"
            alignItems="center"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            {type === "category" ? (
              <>
                <Grid item>
                  <TextField
                    required
                    label="Name"
                    onChange={handleNameChange}
                    value={newName}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <TextField
                    required
                    label="Name"
                    onChange={handleNameChange}
                    value={newName}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Sales"
                    type="number"
                    onChange={handleSalesChange}
                    value={newSales}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <Grid
          container
          justify="center"
          spacing={3}
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <Grid item>
            <Button
              variant="contained"
              size="small"
              onClick={() => setOpenPopup(false)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              color="primary"
              type="submit"
              onClick={() => setOpenPopup(true)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default Popup;
