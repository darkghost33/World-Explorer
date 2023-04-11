import React from "react";
import CountryCard from "../Components/CountryCard";
import "./Home.css";
import { useEffect, useState } from "react";
import { getAllCountries } from "../Services";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProgressBar from './ProgressBar'

function Home() {
  const [allCountriesList, setallCountriesList] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [countryName, setCountryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getAllCountries().then((result) => {
      const countries = result.data;
      setIsLoading(false);
      setallCountriesList(countries);
      setFilterCountries(countries);
      //   console.log(countries);
    });
  }, []);

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };
  const handleCountryNameChange = (event) => {
    setCountryName(event.target.value);
  };

  useEffect(() => {
    console.log("Region or Country changed: ", region, countryName);
    if (region === "All" && countryName === "")
      setFilterCountries(allCountriesList);
    else {
        //Filter based on region
        let filterCountries = allCountriesList;
      if (region.length) {
        filterCountries = allCountriesList.filter((country) => {
          if (country.region === region || region === "All") return true;
          return false;
        });
      }
      //Filter based on country name
      if (countryName.length) {
        filterCountries = filterCountries.filter((country) => {
          const lowerCaseName = country.name.toLowerCase();
          if (lowerCaseName.includes(countryName.toLowerCase())) return true;
          return false;
        });
      }
      setFilterCountries(filterCountries);
    }
  }, [region, allCountriesList, countryName]);

  return (
    <>
    {isLoading ? (<ProgressBar></ProgressBar>):(
      <div className="App">
        <div className="filters">
          <TextField
            id="outlined-basic"
            label="Search By Name"
            variant="outlined"
            onChange={handleCountryNameChange}
            value={countryName}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Filter By Region
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={region}
              label="Filter By Region"
              onChange={handleRegionChange}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Africa"}>Africa</MenuItem>
              <MenuItem value={"America"}>America</MenuItem>
              <MenuItem value={"Asia"}>Asia</MenuItem>
              <MenuItem value={"Europe"}>Europe</MenuItem>
              <MenuItem value={"Oceania"}>Oceania</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="country-card-wrapper">
          {filterCountries.map((country) => (
            <Link
              to={`/countries/${country.alpha3Code}`}
              style={{ textDecoration: "none" }}
            >
              <CountryCard
                name={country.name}
                capital={country.capital}
                population={country.population}
                flagUrl={country.flags.png}
                key={country.alpha3Code}
              />
            </Link>
          ))}
        </div>
      </div>)}
    </>
  );
}

export default Home;
