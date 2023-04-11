import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryDetails } from "../Services";
import "../Pages/CountryDetail.css";
import ListItemText from "@mui/material/ListItemText";
import ProgressBar from "./ProgressBar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function CountryDetail(props) {
  const { countryCode } = useParams();
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCountryDetails(countryCode).then((result) => {
      console.log("result.data", result.data);
      setIsLoading(false);
      setDetail(result.data);
    });
  }, [countryCode]);

  return (
    <>
      {isLoading ? (
        <ProgressBar data="Just a minute...."></ProgressBar>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography
                  id="main-heading"
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { sm: "block" } }}
                >
                  World Explorer - Detailed Info Of {`${detail.name}`}
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <div
            className="country-detail-wrapper"
          >
            <div>
              <img
                className="image"
                src={detail.flags?.png}
                alt={detail.name}
              ></img>
            </div>
            <div className="rest-detail">
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    fontFamily={"sans-serif"}
                    fontSize={20}
                  >
                    {`Name: ${detail.name}/${detail.nativeName}`}
                  </Typography>
                }
              />

              <Divider></Divider>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    fontFamily={"sans-serif"}
                    fontSize={20}
                  >
                    {`Capital: ${detail.capital}`}{" "}
                  </Typography>
                }
              />
              <Divider></Divider>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    fontFamily={"sans-serif"}
                    fontSize={20}
                  >
                    {`Languages Spoken: ${" "}
                ${detail.languages
                  ?.map((language) => language.name)
                  .join(",")}`}
                  </Typography>
                }
              />
              <Divider></Divider>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    fontFamily={"sans-serif"}
                    fontSize={20}
                  >
                    {`Region: ${detail.region}`}
                  </Typography>
                }
              />
              <Divider></Divider>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    fontFamily={"sans-serif"}
                    fontSize={20}
                  >{`Currencies:${" "} 
                ${detail.currencies
                  ?.map((currency) => currency.name)
                  .join(",")}`}</Typography>
                }
              />
              <Divider></Divider>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    fontFamily={"sans-serif"}
                    fontSize={20}
                  >{`Population: ${detail.population}`}</Typography>
                }
              />
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    fontFamily={"sans-serif"}
                    fontSize={20}
                  >{`Timezone: ${detail.timezones}`}</Typography>
                }
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CountryDetail;
