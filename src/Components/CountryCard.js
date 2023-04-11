import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import './CountryCard.css'

function CountryCard(props) {
  return (
    <Card sx={{ maxWidth: 345, width: "180px" }} className="card">
      <CardMedia
        sx={{ height: 140 }}
        image={props.flagUrl}
        title={props.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className="content">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Capital: {props.capital}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CountryCard;
