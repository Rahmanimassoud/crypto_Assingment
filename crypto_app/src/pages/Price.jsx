import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Price = (props) => {

    // api key
    const apiKey = "A85A77E2-4702-409D-BDE7-627656E8B98F";

    // Grabbing the Currency symbol from the URL Params
    const params = useParams()
    const symbol = params.symbol

     // Using the other two variables to create our URL
    const url = `http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;
    // state to hold the coin data
    const [coin, setCoin] = useState("null");

    // function to fetch coin data
    const getCoin = async () => {
        try{
            const res = await fetch(url);
            const data = await res.json();
            setCoin(data);
        } catch(e){
            console.error(e);
        }
    };

    // useEffect to run getCoin when component mounts

    useEffect(()=> {
        getCoin();
    }, []);

    // load function for when data is fetched
    const loaded = () => {
        return (
            <div>
                <h1>{coin.asset_id_base} / {coin.asset_id_quote}</h1>
                <h2>{coin.rate}</h2>
            </div>
        );
    };

    // function for when data doesn't exist
    const loading = () => {
        return <h1>Loading...</h1>
    };

    // if coin has data, run the loaded function, otherwise, run loading
    return coin && coin.rate ? loaded() : loading();
};

export default Price;
