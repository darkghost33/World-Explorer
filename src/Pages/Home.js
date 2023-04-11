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
import ProgressBar from "./ProgressBar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Home() {
  const [allCountriesList, setallCountriesList] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [countryName, setCountryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllCountries().then((result) => {
      const countries = result.data;
      console.log(countries);
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
      {isLoading ? (
        <ProgressBar data="Loading Countries..."></ProgressBar>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                  className="logo"
                >
                  <div>
                    <img
                      src="https://bestanimations.com/media/earth/726892854earth-spinning-rotating-animation-14.gif"
                      style={{ height: "50px", width: "50px" }} alt="No"
                    ></img>
                  </div>
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1,  }}
                  className="logo"
                >
                  World Explorer
                </Typography>
                <Typography>
                  <div className="filters">
                    <TextField
                      id="outlined-basic"
                      label="Search By Name"
                      variant="filled"
                      onChange={handleCountryNameChange}
                      value={countryName}
                      style={{ background: "white", borderRadius: "4px" }}
                    />
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Filter By Region
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        variant="filled"
                        id="demo-simple-select-helper"
                        value={region}
                        label="Filter By Region"
                        onChange={handleRegionChange}
                        style={{ backgroundColor: "white" }}
                      >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"Africa"}>Africa</MenuItem>
                        <MenuItem value={"Americas"}>America</MenuItem>
                        <MenuItem value={"Asia"}>Asia</MenuItem>
                        <MenuItem value={"Europe"}>Europe</MenuItem>
                        <MenuItem value={"Oceania"}>Oceania</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <div className="App">
            <div className="country-card-wrapper">
              {filterCountries.map((country) => (
                <Link
                  to={`/countries/${country.alpha3Code}`}
                  style={{ textDecoration: "none" }}
                >
                  <CountryCard
                    name={
                      country.name.length > 10
                        ? country.name.substring(0, 10) + "..."
                        : country.name
                    }
                    capital={country.capital}
                    //   population={country.population.toString().length > 6 ? country.population.toString().substring(0,2)+"..." : country.toString().population}
                    flagUrl={country.flags.png}
                    key={country.alpha3Code}
                  />
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
