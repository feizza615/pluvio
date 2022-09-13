import axios from "axios";
import React from "react";
import {config} from "../../config"
import NavigationBar from "../../components/NavigationBarComponent/NavigationBar";

const baseURL = "https://api.themoviedb.org/3/movie/550?api_key="+config.DB_KEY;

export default function MatchPage() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  const myJSON = JSON.stringify(post);
  if (!post) return null;

  return (
    <div>
      <br/>
      <br/>
      <div>
        <h1>Title: {post.original_title}</h1>
        <h1>Overview: {post.overview} </h1>
      </div>
      
    </div>
  );
}