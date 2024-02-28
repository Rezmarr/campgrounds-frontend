import { useLocation, useNavigate } from "react-router-dom";
import "./editCampground.scss";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios.js";
import { useState } from "react";
import ClickableImage from "../../components/clickableImage/ClickableImage.jsx";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

const mapBoxToken = "pk.eyJ1IjoicmV6bWFhcnIiLCJhIjoiY2xsOHVubXZuMTZudjNybnd1Y3NseGRpbyJ9.NdjKtULmrVndUqVMNLfeQA";
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

function EditCampground() {

  const location = useLocation();
  const { state } = location;

  const data = state && state.data;

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({ title: data.title, location: data.location, price: data.price, description: data.description })
  const [files, setFiles] = useState(null);
  const [filesToDelete, setFilesToDelete] = useState([]);

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setInputs((currInputs) => ({ ...currInputs, [e.target.name]: e.target.value }));
  }

  const mutation = useMutation((campground) => {
    return makeRequest.put(`/campground/${data.id}`, campground);
  }, {
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries(['campground', data.id]);
      navigate(`/${data.id}`);
    },
  })

  const handleClick = async e => {
    e.preventDefault();
    // let imgUrls = [];
    // if (files) imgUrls = await upload();

    const geoData = await geocoder.forwardGeocode({
      query: inputs.location,
      limit: 1
    }).send();

    const latitude = geoData.body.features[0].geometry.coordinates[0];
    const longitude = geoData.body.features[0].geometry.coordinates[1];

    const formData = new FormData();

    // Agregar campos de texto al FormData
    formData.append("Title", inputs.title);
    formData.append("Latitude", latitude);
    formData.append("Longitude", longitude);
    formData.append("Price", inputs.price);
    formData.append("Description", inputs.description);
    formData.append("Location", inputs.location);
    formData.append("ProvinceId", 1);
    formData.append("ImagesToDelete", filesToDelete);

    // Agregar imágenes al FormData
    for (const file of files) {
      formData.append("Images", file);
    }

    const requestBody = formData;

    mutation.mutate(requestBody);
    // setInputs("")
    // setFiles(null)
  };

  const handlePicSelection = (id) => {
    setFilesToDelete((currItems) => {
      // Verifica si la imagen ya está en el arreglo
      const isImageSelected = currItems.includes(id);

      if (isImageSelected) {
        // Si la imagen ya está en el arreglo, elimínala
        return currItems.filter((item) => item !== id);
      } else {
        // Si la imagen no está en el arreglo, agrégala
        return [...currItems, id];
      }
    });
  };

  return (
    <div className="editCampground">
      <div className="container">
        <p>Editar Campamento</p>
        <div className="item">
          <label htmlFor="title">Nombre del campamento:</label>
          <input placeholder="Ingresa un nombre" type="text" id="title" name="title" value={inputs.title} onChange={handleChange} required />
        </div>
        <div className="item">
          <label htmlFor="location">Ubicación del campamento:</label>
          <input placeholder="Ingresa una ciudad" type="text" id="location" name="location" value={inputs.location} onChange={handleChange} required />
        </div>
        <div className="images">
          <label htmlFor="formFile">
            <CloudUploadIcon />
            Sube fotos del campamento
          </label>
          <input type="file" name="image" id="formFile" onChange={(e) => setFiles(e.target.files[0])} multiple />
        </div>
        {files ? <><div>Vista previa de las imágenes subidas:</div>
          <div className="gallery">
            <img src={data.picture} alt="" />
            <img src={data.picture} alt="" />
          </div></> : <></>}
        <div>Selecciona las imágenes que deseas eliminar</div>
        <div className="gallery">
          {data && data.images.map(image => (
            <ClickableImage key={image.id} src={image.url} handlePicSelection={() => handlePicSelection(image.id)} />
          ))}
          {/* <ClickableImage key={1} src={data.picture} handlePicSelection={handlePicSelection} />
          <ClickableImage key={2} src={data.picture} handlePicSelection={handlePicSelection} />
          <ClickableImage key={3} src={data.picture} handlePicSelection={handlePicSelection} />
          <ClickableImage key={4} src={data.picture} handlePicSelection={handlePicSelection} /> */}
        </div>
        <div className="item">
          <label htmlFor="price">Precio del campamento:</label>
          <div>
            <span id="price-label">S/</span>
            <input type="number" id="price" name="price"
              placeholder="0.00" aria-label="price" aria-describedby="price-label" value={inputs.price} onChange={handleChange} required />
          </div>
        </div>
        <div className="item">
          <label htmlFor="description">Descripción:</label>
          <textarea placeholder="Ingresa una descripción" type="text" id="description" name="description" value={inputs.description} onChange={handleChange} required></textarea>
        </div>
        <div className="item">
          <button onClick={handleClick}>Actualizar</button>
        </div>
      </div>
    </div>
  )
}

export default EditCampground
