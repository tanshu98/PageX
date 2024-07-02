import React, { Component } from "react";
import withRouter from "../HOC/withRouter";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import {
  Accordion,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
interface Iprops {
  location: any;
}
interface IPosts {
  body: string;
  id: number;
  title: string;
  userId: number;
}
interface IComments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
interface IState {
  data: IPosts[];
  activeId: number | null;
  commentsData: IComments[];
  userComment: string;
  // FavoriteBorderIcon: boolean;
  // FavoriteIcon: boolean;
  // CommentIcon: boolean;
}
export class Home extends Component<Iprops, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      activeId: null,
      commentsData: [],
      userComment: ""
      // FavoriteBorderIcon: true,
      // FavoriteIcon: false,
      // CommentIcon: true,
    };
  }
  componentDidMount(): void {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        // console.log(response.data);
        this.setState({
          data: response.data,
        });
      } catch (error) {
        alert(error);
      }
    };
    fetchPosts();
  }

  FavoriteIconHandler = (id: number) => {
    this.setState((prevState) => ({
      activeId: prevState.activeId === id ? null : id,
    }));
  };

  commentsHandler = async (postId: number) => {
    console.log("commentsHandler is clicked");
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      console.log(response.data);
      this.setState({
        commentsData: response.data,
      });
    } catch (error) {
      alert(error);
    }
  };
  userCommentHandler = (event: React.ChangeEvent<HTMLInputElement>)=> {
    this.setState((prevState)=> ({
      ...prevState,
      userComment: event.target.value
    }))
  }

  render() {
    // console.log(this.props.location);
    // console.log("data", this.state.data);
    console.log('dataaaaaaaaaaaaaaaaaaaaaa ======', this.state);
    

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mt: 13,
            gap: 5,
          }}
        >
          {this.state.data.length === 0 ? (
            <CircularProgress />
          ) : (
            this.state.data.map((d) => (
              <Box key={d.id}>
                <Card
                  sx={{
                    maxWidth: 500,
                    display: "flex",
                    flexDirection: "column",
                    // textAlign: "center",
                    gap: 1,
                    pt: 1,
                    pb: 1,
                  }}
                >
                  <Typography sx={{ mb: 1, p: 2 }}>{d.title}</Typography>
                  <CardMedia
                    component="img"
                    src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                    alt="frog"
                  />
                  <CardContent>
                    <Typography>{d.body}</Typography>
                  </CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ p: 2 }}
                      onClick={() => this.FavoriteIconHandler(d.id)}
                    >
                      {this.state.activeId !== d.id ? (
                        <FavoriteBorderIcon />
                      ) : (
                        <FavoriteIcon sx={{ color: "red" }} />
                      )}
                    </Box>
                    {/* Accordian  */}
                    <Accordion>
                      <AccordionSummary
                        sx={{ display: "flex", gap: 2, p: 2 }}
                        expandIcon={
                          <CommentIcon
                            onClick={() => this.commentsHandler(d.id)}
                          />
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>Comments</Typography>
                      </AccordionSummary>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap:2,
                          p:1
                          // justifyContent: "space-evenly",
                        }}
                      >
                        <Avatar
                          sx={{ width: 20, height: 20 }}
                          alt="Profile Picture"
                          src="https://mui.com/static/images/avatar/3.jpg"
                        />
                        <TextField value={this.state.userComment} onChange={this.userCommentHandler}  />
                        <Button variant="contained" >Post</Button>
                      </Box>
                      {this.state.commentsData &&
                        this.state.commentsData.map((comments, index) => (
                          <Box sx={{ p: 2 }} key={comments.id}>
                            <Typography sx={{ display: "flex", gap: 2 }}>
                              {" "}
                              <Avatar
                                sx={{ width: 20, height: 20 }}
                                alt="Profile Picture"
                                src="https://mui.com/static/images/avatar/3.jpg"
                              />{" "}
                              {comments.name}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                              Body - {comments.body}
                            </Typography>
                          </Box>
                        ))}
                    </Accordion>
                  </Box>
                </Card>
              </Box>
            ))
          )}
        </Box>
      </>
    );
  }
}

export default withRouter(Home);

// Comments sathi Accordian..
// Fix the card size..uniorm size aala pahije..dot dot dot... asa aala pahije remaining body data madhe..
// card body madhe hover kel tr ch aaplya la baki cha data disla pahije..so tooltip use krshil
