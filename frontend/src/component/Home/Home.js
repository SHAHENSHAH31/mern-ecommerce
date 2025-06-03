import React, { Fragment, useEffect } from "react";
import { GiSeatedMouse } from "react-icons/gi";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import { getProducts ,clearErrors} from "../../redux/reducers/productReducer";
import MetaData from "../layout/MetaData"
import { useSelector,useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {

  const dispatch=useDispatch();
  const alert = useAlert();
  //const keyword="key";
  const {products,loading,error}=useSelector((state)=> state.productReducer);
  //const {loading,error}=useSelector((state)=> state.productReducer);
  console.log('hi');
  console.log('',products);

  useEffect(()=>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
     dispatch(getProducts({}));
  },[dispatch, error, alert])

  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
        <Fragment>

          <MetaData title={"Ecommerce"} />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <GiSeatedMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
           {products && products.map((product)=><ProductCard product={product} />)}
          </div>
        </Fragment>
      )}
      </Fragment>
  )
};

export default Home;