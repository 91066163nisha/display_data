import React, { useEffect, useState } from "react";
import data from "./data.json";
import "../css_files/Movie.css";
export default function Movie() {
  const [newdata, setnewdata] = useState([]);
  const [count, setCount] = useState(0);
  const handleChange = (e) => {
    if (e.target.value === "release_year") {
      sortYear(data);
    } else if (e.target.value === "name") {
      sortName(data);
    }
  };
  function sortYear(data) {
    data.sort((a, b) => (a.release_year > b.release_year ? 1 : -1));
    setCount(count + 1);
    setnewdata(data);
  }
  function sortName(data) {
    data.sort((a, b) => (a.name > b.name ? 1 : -1));
    setCount(count + 1);
    setnewdata(data);
  }
  useEffect(() => {
    setnewdata(data);
    console.log(data, "effect");
  }, []);

  function Search(e) {
    let newArr = [];
    const str = e.target.value;
    const inputValue =
      str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    console.log(inputValue, "input");
    data.forEach((elem) => {
      const value = Object.values(elem);
      let index = value.indexOf(inputValue);
      if (index != -1) {
        newArr.push(elem);
      }
    });
    setnewdata(newArr);
  }

  return (
    <>
      <div>
        <h1 style={{ display: "none" }}>{count}</h1>
        <form className="combo_box">
          <span className="input_name">Search Movie</span>
          <input type={"search"} className="search_name" onChange={Search} />
          <span className="input_name">Sort data</span>
          <select onChange={handleChange} className="search_box">
            <option></option>
            <option value={"name"}>Sort by name</option>
            <option value={"release_year"}>Sort by year</option>
          </select>
        </form>
        <div className="main_box">
          {newdata.map((elem) => (
            <>
              <div className="card">
                <img src={elem.image} />
                <h1 className="title">{elem.name}</h1>
                <h3 className="data">{elem.release_year}</h3>
                <p className="detail">{elem.description}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
