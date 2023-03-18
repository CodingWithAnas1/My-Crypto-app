import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import CoinCard from "./CoinCard";
import Error from "./Error";
import Loader from "./Loader";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("pkr");

  const currencySymbol =
    currency === "pkr" ? "PKR" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    window.scrollTo(0, 0);
    setPage(page);
    setLoading(true);
  };
  const btns = new Array(114).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setLoading(false);
        setCoins(data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <Error message="Error While Fetching Coins" />;

  return (
    <Container maxW={"container.lg"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"6"}>
              <Radio value={"pkr"}>PKR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((e) => (
              <CoinCard
                id={e.id}
                key={e.id}
                name={e.name}
                img={e.image}
                symbol={e.symbol}
                url={e.url}
                price={e.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack overflowX={"auto"} w={"full"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
