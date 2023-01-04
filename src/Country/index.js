import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import RenderCountries from "./RenderCountries";
import Search from "./Search";
import "./Country.css";

const Country = () => {
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [APIData, setAPIData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    getCountriesList();
  }, []);

  const getCountriesList = () => {
    const request_headers = new Headers();
    const api_key = "7SjgI8My6qvX72tnspeED9Hm9xfIbTELBcB9hdtV";
    request_headers.append("Authorization", `Bearer ${api_key}`);
    request_headers.append("Content-Type", "application/json");

    const request_options = {
      method: "GET",
      headers: request_headers,
    };

    fetch("https://countryapi.io/api/all", request_options)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          setAPIData(Object.values(result));
        },
        (error) => {
          setLoaded(true);
          setError(error);
        }
      );
  };

  const filteredData = !searchInput
    ? APIData
    : APIData.filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const numberOfPages = Math.ceil(filteredData.length / recordsPerPage);

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(filteredData.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (error) return <h2>{error.message}</h2>;
  else if (!loaded) return <h2>Loading...</h2>;
  else
    return (
      <div className="wrapper">
        <Search setSearchInput={setSearchInput} />
        <ul className="card-grid">
          {currentRecords.map((item) => (
            <li key={item.alpha3Code}>
              <RenderCountries item={item} />
            </li>
          ))}
        </ul>
        <Pagination
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    );
};

export default Country;
