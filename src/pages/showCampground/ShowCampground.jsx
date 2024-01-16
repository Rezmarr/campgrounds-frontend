import { useNavigate, useParams } from "react-router-dom";
import "./showCampground.scss";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useState } from "react";
import Reviews from "../../components/reviews/Reviews";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";

function ShowCampground() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(false);
  const [reviewsIsOpen, setReviewsIsOpen] = useState(false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
  }

  const queryClient = useQueryClient();

  if (reviewsIsOpen) {
    document.body.classList.add('hide-scrollbar');
  } else {
    document.body.classList.remove('hide-scrollbar');
  }

  const { isLoading, error, data } = useQuery(['campground', id], () =>
    makeRequest.get(`/campground/${id}`).then(res => {
      return res.data;
    })
  )

  const { isLoading: reviewsIsLoading, error: reviewsError, data: reviews } = useQuery(['reviews', id], () =>
    makeRequest.get(`/campground/${id}/reviews`).then(res => {
      return res.data;
    })
  )

  const deleteMutation = useMutation(
        (postId) => {
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
        deleteMutation.mutate(id);
    }

  // const data = {
  //   id: 1,
  //   title: "Camping Río Serpenteante",
  //   price: 35,
  //   location: "Valle Pintoresco",
  //   description: "Acampa junto al río serpenteante y sumérgete en la belleza natural del valle.",
  //   picture: "https://cdn.pixabay.com/photo/2021/01/04/10/45/tent-5887144_1280.jpg"
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
          {/* <img src={data.picture} alt="" /> */}
          <img src="https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_1280.jpg" alt="" />
        </div>
        <div className="footer">
          <div className="information">
            <div className="top">
              <span className="rating">
                <StarIcon className="star" />
                <span>5.0</span>
              </span>
              ·
              <span className="reviewsCount" onClick={() => setReviewsIsOpen(true)}>
                {reviews ? reviews.length : "0"} reseñas
              </span>
            </div>
            <div className="owner">
              <img src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" />
              <span>Publicado por: {data.username}</span>
            </div>
            <div className="details">
              {data.description}
            </div>
            <div className="buttons">
              <button className="update" onClick={() => navigate(`/edit/${id}`, { state: { data } })}>
                Actualizar información
              </button>
              <button className="delete" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
          <div className="mapContainer">
            <span>A dónde irás</span>
            <div className="map">
              <h2>Mapa</h2>
            </div>
          </div>
        </div>
      </div>}
      {reviewsIsOpen && <Reviews reviews={reviews} setReviewsIsOpen={setReviewsIsOpen} />}
    </div>
  )
}

export default ShowCampground
