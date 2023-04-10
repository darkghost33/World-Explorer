import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryDetail from "./Pages/CountryDetail";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center" }}>
              404 : Error Page Not Found!!
            </h1>
          }
        ></Route>
        <Route
          path="/countries/:countryCode"
          element={<CountryDetail></CountryDetail>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
