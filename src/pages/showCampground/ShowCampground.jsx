import { useNavigate, useParams } from "react-router-dom";
import "./showCampground.scss";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useContext, useState } from "react";
import Reviews from "../../components/reviews/Reviews";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest, makeRequestPublic } from "../../axios";
import Map from "../../components/map/Map";
import { AuthContext } from "../../context/authContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Book from "../../components/book/Book";

function ShowCampground() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(false);
  const [reviewsIsOpen, setReviewsIsOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
  }

  const queryClient = useQueryClient();

  const images = [
    "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345767/demo_image2.jpg",
    "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652366604/demo_image5.jpg",
    "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345874/demo_image1.jpg",
  ];

  if (reviewsIsOpen) {
    document.body.classList.add('hide-scrollbar');
  } else {
    document.body.classList.remove('hide-scrollbar');
  }

  const { isLoading, error, data } = useQuery(['campground', id], () =>
    makeRequestPublic.get(`/campground/${id}`).then(res => {
      return res.data;
    })
  )

  const { isLoading: reviewsIsLoading, error: reviewsError, data: reviews } = useQuery(['reviews', id], () =>
    makeRequestPublic.get(`/campground/${id}/reviews`).then(res => {
      return res.data;
    })
  )

  const deleteMutation = useMutation(
    () => {
      return makeRequest.delete(`/campground/${id}`);
    },
    {
      onSuccess: () => {
        //Invalidate and refetch
        queryClient.invalidateQueries(["campgrounds"]);
        navigate("/");
      }
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate();
  }

  // const data = {
  //   id: 1,
  //   title: "Camping Río Serpenteante",
  //   price: 76,
  //   location: "Valle Pintoresco",
  //   description: "Acampa junto al río serpenteante y sumérgete en la belleza natural del valle.",
  //   latitude: "-77.1123622",
  //   longitude: "-12.0445345",
  //   score: "0",
  //   host: {
  //     id: 1,
  //     firstName: "Renzo",
  //     lastName: "Zapata"
  //   }
  // };

  return (
    <div className="showCampground">
      {data && <div className="container">
        <div className="header">
          <div className="head">
            <p className="title">{data.title}</p>
            <div className="items">
              <div className="item">
                <IosShareIcon style={{ width: "20px", height: "20px" }} />
                <p>Compartir</p>
              </div>
              <div className="item" onClick={handleFavorite}>
                {favorite ? <FavoriteIcon className="favorite" style={{ color: "red" }} /> : <FavoriteTwoToneIcon onClick={handleFavorite} className="favorite" />}
                <p>{favorite ? "Guardado" : "Guardar"}</p>
              </div>
            </div>
          </div>
          {/* <img src={data.images[0].url} alt="" /> */}
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
            {
              (data.images.length > 0 ? data.images : images).map((URL, index) => (
                <div className="slide" key={index}>
                  <img alt="sample_file" src={URL} />
                </div>
              ))}
          </Carousel>
        </div>
        <div className="footer">
          <div className="information">
            <div className="top">
              <span className="rating">
                <StarIcon className="star" />
                <span>{data.score}</span>
              </span>
              ·
              <span className="reviewsCount" onClick={() => setReviewsIsOpen(true)}>
                {reviews && (reviews ? reviews.length : "0")} reseñas
              </span>
            </div>
            <div className="owner">
              <img src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" />
              <span>Publicado por: {data.host.firstName} {data.host.lastName}</span>
            </div>
            <div className="details">
              {data.description}
            </div>
            {currentUser && (data.host.id === currentUser.id) ?
              <div className="buttons">
                <button className="update" onClick={() => navigate(`/edit/${id}`, { state: { data } })}>
                  Actualizar información
                </button>
                <button className="delete" onClick={handleDelete}>
                  Eliminar
                </button>
              </div> : <></>
            }
          </div>
          <Book data={data} />
        </div>
        <hr />
        <div className="mapContainer">
          <span>A dónde irás</span>
          <Map campground={data} />
          {/* <div className="map">
              <h2>Mapa {data.latitude}, {data.longitud}</h2>
            </div> */}
        </div>
      </div>}
      {reviewsIsOpen && <Reviews score={data.score} campgroundId={id} reviews={reviews} setReviewsIsOpen={setReviewsIsOpen} />}
    </div>
  )
}

export default ShowCampground
