import { Container, Paper } from "@material-ui/core";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Inner: FC<Props> = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Paper
        component="div"
        variant="outlined"
        style={{
          padding: 20,
          marginTop: 120,
          marginBottom: 100,
          borderColor: "orange",
          borderWidth: "1px",
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default Inner;
