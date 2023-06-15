import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

export default function Home() {

  const [posts, setPosts] = useState([]);

  useEffect( () => {
    // const url = "http://localhost:3000/mainPage";
    //
    // try {
    //   const response = await fetch(url);
    //   const json = await response.json();
    //   console.log(json);
    //   setData(json);
    // } catch (error) {
    //   console.log("error", error);
    // }
    fetch('http://localhost:3000/mainPage')
        .then(response => response.json())
        .then(data => setPosts(data.posts));
  }, []);



  return (
    <div >
      <div> There are {posts.length} posts</div>
        {posts.map((post, index) =>
            <BasicCard post={post} key={index} />
        )}


    </div>
  )

}

function BasicCard({post}) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {post.subreddit}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {post.vote}
                </Typography>
                <Typography variant="body2">
                    {post.title.slice(0, 20)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
