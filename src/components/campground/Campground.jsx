import "./campground.scss";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

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

    console.log(data.score)

    return (
        // onClick={() => navigate(`/${data.id}`)}
        <div className="campground">
            <div className="body">
                {/* <img src={data.images[0].filename} alt="" /> */}
                <Carousel showStatus={false} showThumbs={false} renderArrowNext={(clickHandler, hasNext) => {
                    return (
                        hasNext && (
                            <NavigateNextIcon className="navRight" onClick={clickHandler} />
                        )
                    );
                }} renderArrowPrev={(clickHandler, hasNext) => {
                    return (
                        hasNext && (
                            <NavigateBeforeIcon className="navLeft" onClick={clickHandler} />
                        )
                    );
                }}>
                    {data.images.length > 0 ?
                        data.images.map((img, index) => (
                            <div className="slide" key={index}>
                                <img alt="sample_file" src={img.url} />
                            </div>
                        ))
                        :
                        images.map((URL, index) => (
                            <div className="slide" key={index}>
                                <img alt="sample_file" src={URL} />
                            </div>
                        ))}
                </Carousel>
                {/* <img src="https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_1280.jpg" alt="" /> */}
                {favorite ? <FavoriteIcon onClick={handleFavorite} className="favorite" style={{ color: "red" }} /> : <FavoriteTwoToneIcon onClick={handleFavorite} className="favorite" />}
            </div>
            <div className="footer" onClick={() => navigate(`/${data.id}`)}>
                <span className="title">
                    <p>{data.title}</p>
                    <span className="rating">
                        <StarIcon className="star" />
                        <span>{data.score}</span>
                    </span>
                </span>
                <span className="location">{data.location}</span>
                <span className="price">S/ {data.price}<span> por noche</span></span>
            </div>
        </div>
    )
}

export default Campground
