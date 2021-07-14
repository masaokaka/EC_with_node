import { Container, Paper } from "@material-ui/core";
import { FC } from "react";

const Inner: FC = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Paper
        component="div"
        variant="outlined"
        style={{
          padding: 20,
          marginTop: 50,
          marginBottom: 50,
          borderColor: "#fd7e00",
          borderWidth: "2px",
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default Inner;
