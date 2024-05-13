import React, { Fragment, useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetails,
  clearError,
  newReview,
  clearErr,
  newReviewReset
} from "../../redux/reducers/productReducer";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {useParams} from 'react-router-dom';
import { Rating } from "@material-ui/lab";
import { addItemsToCart } from "../../redux/actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const params=useParams();
  const alert = useAlert();
  const {Product,error,loading }   = useSelector((state) => state.productDetailsReducer);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );


  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const increaseQuantity = () => {
    if (Product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };


  useEffect(() => {
    console.log('he');
    if (error) {
      alert.error(error);
     dispatch(clearError());
    }
    
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErr());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch(newReviewReset());
    }

     dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, error, alert, reviewError, success]
);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${Product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">

              <Carousel>
                {Product.images &&
                  Product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
          

            <div>
              <div className="detailsBlock-1">
                <h2>{Product.name}</h2>
                <p>Product # {Product._id}</p>
              </div>
              <div className="detailsBlock-2">
              <Rating size= "large"
               value={Product.ratings}
               readOnly= {true}
               precision= {0.5} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({Product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${Product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity} >-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button  disabled={Product.stock < 1 ? true : false} onClick={addToCartHandler}>
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={Product.stock < 1 ? "redColor" : "greenColor"}>
                    {Product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{Product.description}</p>
              </div>

              <button onClick={submitReviewToggle}  className="submitReview">
                Submit Review
              </button>
            </div>
                  </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

         {Product.reviews && Product.reviews[0] ? (
            <div className="reviews">
              {Product.reviews &&
                Product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
          
  
  );
};

export default ProductDetails;