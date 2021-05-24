import React from "react";

// Components
import Header from "./components/Header";
import CategoryGrid from "./components/CategoryGrid";

// MaterialUI
import Container from "@material-ui/core/Container";

const App = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "5%" }}>
      <Header />
      <CategoryGrid />
    </Container>
  );
};

export default App;
