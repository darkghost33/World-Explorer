import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryDetails } from "../Services";
import '../Pages/CountryDetail.css'

function CountryDetail(props) {
  const { countryCode } = useParams();
  const [detail, setDetail] = useState({});
  useEffect(() => {
    getCountryDetails(countryCode).then((result) => {
    //   console.log("result.data", result.data);
      setDetail(result.data)
    });
  }, [countryCode]);
  return (<div className="country-detail-wrapper">
    <div>
        <img src={detail.flags?.png} alt={detail.name}></img>
    </div>
    <div>
    <div>Name: {detail.name}</div>
    <div>Capital: {detail.capital}</div>
    <div>Population: {detail.population}</div>
    <div>Currencies: {detail.currencies?.map(currency => currency.name).join(',')}</div>

    </div>
  </div>);
}

export default CountryDetail;
