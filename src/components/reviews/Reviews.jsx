import "./reviews.scss"
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/authContext";

function Reviews({ score, campgroundId, reviews, setReviewsIsOpen }) {

    const [value, setValue] = useState(0);
    const [desc, setDesc] = useState("");

    const queryClient = useQueryClient();

    const { currentUser } = useContext(AuthContext);

    const mutation = useMutation((newReview) => {
        return makeRequest.post("/reviews", newReview);
    }, {
        onSuccess: () => {
            //Invalidate and refetch
            queryClient.invalidateQueries(['reviews', campgroundId])
        },
    })

    const handleClick = async e => {
        e.preventDefault();
        mutation.mutate({ campgroundId: campgroundId, body: desc })
        setDesc("")
        setValue(0)
    };

    return (
        <div className="reviews">
            <div className="container">
                <CloseIcon className="close" onClick={() => setReviewsIsOpen(false)} />
                <div className="left">
                    <span className="rating">
                        <StarIcon className="star" />
                        <span>{score}</span>
                    </span>
                    <div className="general">
                        <p>Valoración general</p>
                        <div className="scale"><span>5</span><div className="bar"></div></div>
                        <div className="scale"><span>4</span><div className="bar"></div></div>
                        <div className="scale"><span>3</span><div className="bar"></div></div>
                        <div className="scale"><span>2</span><div className="bar"></div></div>
                        <div className="scale"><span>1</span><div className="bar"></div></div>
                    </div>
                    <div className="features">

                    </div>
                </div>
                <div className="right">
                    <div className="head">
                        <p>{reviews && reviews.length} reseñas</p>
                        <div className="filter">
                            Las más recientes
                            <ExpandMoreIcon className="expand" />
                        </div>
                    </div>
                    {currentUser &&
                        <div className="create">
                            <div className="author">
                                <img src="https://images.pexels.com/photos/19426671/pexels-photo-19426671/free-photo-of-hamid-sefat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                <div className="text">
                                    <span className="name">{currentUser.firstName + currentUser.lastName}</span>
                                    <span className="location">Lima, Perú</span>
                                </div>
                                <div className="stars">
                                    <Rating name="read-only" max={1} value={1} readOnly />
                                    <Rating
                                        name="simple-controlled"
                                        max={4}
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="desc">
                                <input type="text" name="description" id="" value={desc} onChange={(e) => setDesc(e.target.value)} />
                                <button onClick={handleClick}>Enviar</button>
                            </div>
                        </div>
                    }
                    <hr />
                    <div className="body">
                        {reviews && reviews.map(review => (
                            <div key={review.id} className="review">
                                <div className="author">
                                    <img src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" />
                                    <div className="text">
                                        <span className="name">{review.username}</span>
                                        {/* <span className="location">Lima, Perú</span> */}
                                    </div>
                                </div>
                                <div className="calif">
                                    <div className="stars">
                                        <StarIcon className="star" />
                                        <StarIcon className="star" />
                                        <StarIcon className="star" />
                                        <StarIcon className="star" />
                                        <StarIcon className="star" />
                                    </div>
                                    ·
                                    <span>Hace 1 semana</span>createdAt DATETIME
                                </div>
                                <div className="desc">
                                    {review.body}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews