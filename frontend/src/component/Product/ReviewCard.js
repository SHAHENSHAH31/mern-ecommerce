

import { Rating } from "@material-ui/lab";


const ReviewCard = ({ review }) => {
 

  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

    console.log("review===============>",review);

  return (
    
    <div className="reviewCard">
      {review?.user?.avatar?.url ? (<img src={review?.user?.avatar?.url} alt="User" />):( <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShmmNO8XjAUCD2e9hlIQaSdEy3Yh7VUQ-JJxopjmYl9iu8D31dXSjc2or5r9KEPenz8SI&usqp=CAU" alt="User" />)}
     
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
    )
};

export default ReviewCard;