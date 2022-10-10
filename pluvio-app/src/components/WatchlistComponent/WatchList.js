import React, { useEffect, useState } from "react";
import "./watchlist.css"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Card from "../Card";
import axios from "axios";
import { config } from "../../config"
import { WatchListCard } from "../MovieCard";
import { Skeleton } from "@mui/material";

const baseURL = "https://api.themoviedb.org/3/search/movie?api_key=" + config.DB_KEY;

const Watchlist = ({ watchlistdata }, { data }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [details, setDetails] = useState(null)
    const sizeOfList = watchlistdata.watchlist.length;

    useEffect(() => {
        let det = []
        async function test() {
            setIsLoaded(false)
            for (var i = 0; i < sizeOfList; i++) {
                await axios
                    .get("https://api.themoviedb.org/3/movie/" + watchlistdata.watchlist[i] + "?api_key=" + config.DB_KEY)
                    .then((response) => {
                        det.push("https://image.tmdb.org/t/p/w500" + response.data.poster_path)
                    })
            }       
            setDetails(det)
        } test().then(
            setIsLoaded(true))
    }, [])



    return (
        <>
            <Card>
                <div class="scroll">
                    <h3 className="test"> Watchlist</h3>
                    <ul className="contentsList">
                        {isLoaded && details ? details.map((movie, x) =>
                            <WatchListCard title={movie} />
                        ) : <Skeleton />}
                    </ul>
                </div>
            </Card>
        </>
    )
}

export default Watchlist