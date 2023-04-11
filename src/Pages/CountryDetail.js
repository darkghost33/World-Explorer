import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryDetails } from "../Services";
import "../Pages/CountryDetail.css";
import ListItemText from "@mui/material/ListItemText";

function CountryDetail(props) {
  const { countryCode } = useParams();
  const [detail, setDetail] = useState({});
  useEffect(() => {
    getCountryDetails(countryCode).then((result) => {
      //   console.log("result.data", result.data);
      setDetail(result.data);
    });
  }, [countryCode]);

  return (
    <div className="country-detail-wrapper">
      <div className="image">
        <img src={detail.flags?.png} alt={detail.name}></img>
      </div>
      <div className="rest-detail">
        <ListItemText primary={`Name: ${detail.name}`} />
        <ListItemText primary={`Capital: ${detail.capital}`} />
        <ListItemText primary={`Population: ${detail.population}`} />
        <ListItemText
          primary={`Currencies:${" "}
          ${detail.currencies?.map((currency) => currency.name).join(",")}`}
        />
      </div>
    </div>
  );
}

export default CountryDetail;
