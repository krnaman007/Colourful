import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import "../../styles/nav_search_icon.css";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />|
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form> */}
      <form className="input-wrapper" role="search" onSubmit={handleSubmit}>
        <button className="icon" type="submit">
          <BiSearchAlt />
        </button>
        <input
          className="input"
          name="text"
          type="text"
          placeholder="Search... "
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
      </form>
    </>
  );
};

export default SearchInput;
