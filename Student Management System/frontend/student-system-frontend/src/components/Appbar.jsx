import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";

// Styled AppBar
const CustomAppBar = styled(AppBar)({
  backgroundColor: "#1976d2", // primary blue
});

// Styled Title
const Title = styled(Typography)({
  flexGrow: 1,
});

export default function MyAppBar() {
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Title variant="h6">Student System</Title>
      </Toolbar>
    </CustomAppBar>
  );
}
