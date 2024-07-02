import React, { Component } from "react";
import withRouter from "../HOC/withRouter";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface Iprops {
  location: any;
}
interface IState {
  mobileOpen: boolean;
}
export class Header extends Component<Iprops, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }

  handleDrawerToggle = () => {
    console.log("Inside handleDrawerToggle");
    this.setState((prevState) => ({
      mobileOpen: !prevState.mobileOpen,
    }));
  };
  render() {
    console.log(this.props.location);

    const navItems = ["Home", "UserProfile"];
    console.log(navItems);
    const drawerWidth = 240;

    const drawer = (
      <Box onClick={this.handleDrawerToggle} sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          PostsX
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item}>
              <ListItemButton>
                <ListItemText>{item}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );

    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            sx={{ backgroundColor: "black" }}
            component="nav"
            position="fixed"
          >
            <Toolbar
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                sx={{ mr: 2, display: { sm: "none" } }}
                onClick={this.handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Typography sx={{ display: { xs: "none", sm: "block" } }}>
                PostsX
              </Typography>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  justifyContent: { sm: { justifyContent: "space-between" } },
                }}
              >
                {navItems.map((item) => (
                  <Button key={item} sx={{ color: "#fff" }}>
                    {item}
                  </Button>
                ))}
              </Box>
              <Avatar
                alt="Profile Picture"
                src="https://mui.com/static/images/avatar/3.jpg"
              />
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer
          open={this.state.mobileOpen}
          onClose={this.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Box sx={{ marginTop: '64px' }}>
        </Box>
      </>
    );
  }
}

export default withRouter(Header);
