import "./campground.scss";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Campground({ data }) {

    const [favorite, setFavorite] = useState(false);

    const navigate = useNavigate();

    const handleFavorite = (e) => {
        e.stopPropagation();
        setFavorite(!favorite);
    }

    const images = [
        "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345767/demo_image2.jpg",
        "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652366604/demo_image5.jpg",
        "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345874/demo_image1.jpg",
    ];

    return (
        <div className="campground" >
            <div className="body">
                {/* <img src={data.images[0].filename} alt="" /> */}
                {/* <Carousel showThumbs={false} renderArrowNext={(clickHandler, hasNext) => {
                    return (
                        hasNext && (
                            <button className="nav_btn nav_btn_right" onClick={clickHandler}>
                                aaa
                            </button>
                        )
                    );
                }}>
                    {images.map((URL, index) => (
                        <div className="slide" key={index}>
                            <img alt="sample_file" src={URL} />
                        </div>
                    ))}
                </Carousel> */}
                <img src="https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_1280.jpg" alt="" />
                {favorite ? <FavoriteIcon onClick={handleFavorite} className="favorite" style={{ color: "red" }} /> : <FavoriteTwoToneIcon onClick={handleFavorite} className="favorite" />}
            </div>
            <div className="footer">
                <span className="title">
                    <p>{data.title}</p>
                    <span className="rating">
                        <StarIcon className="star" />
                        <span>5.0</span>
                    </span>
                </span>
                <span className="location">{data.location}</span>
                <span className="price">S/ {data.price}<span> por noche</span></span>
            </div>
        </div>
    )
}

export default Campground