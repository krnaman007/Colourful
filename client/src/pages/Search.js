import Layout from "../components/layout/layout";
import React from "react";
import { useSearch } from "../context/search";
import "../styles/productCard.css";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className={"container"}>
        <div>
          <div className="text-center mt-3">
            <h1>Search Resuts</h1>
            <h6>
              {values?.results.length < 1
                ? "No Products Found"
                : `Found ${values?.results.length}`}
            </h6>
          </div>
          <div className="d-flex flex-wrap justify-content-around">
            {values?.results.map((p) => (
              <div className="card-1" key={p._id}>
                <div className="product-image-container">
                  <img
                    className="product-image"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt="Product Image"
                  />
                </div>
                <div className="product-details">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-description">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="product-price">₹ {p.price}</p>
                </div>
                <div className="buttons-container">
                  <button className="button">More Details</button>
                  <button className="button">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
