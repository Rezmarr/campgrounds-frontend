import { useState } from "react";
import "./createCampground.scss";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios.js";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { useNavigate } from "react-router-dom";

const mapBoxToken = "pk.eyJ1IjoicmV6bWFhcnIiLCJhIjoiY2xsOHVubXZuMTZudjNybnd1Y3NseGRpbyJ9.NdjKtULmrVndUqVMNLfeQA";
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

function CreateCampground() {

  const [inputs, setInputs] = useState({ title: "", location: "", price: "", description: "" })
  const [files, setFiles] = useState(null);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((currInputs) => ({ ...currInputs, [e.target.name]: e.target.value }));
  }

  // const upload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("files", files);
  //     const res = await makeRequest.post("/upload", formData);
  //     return res.data;
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const mutation = useMutation((newCampground) => {
    return makeRequest.post("/campground", newCampground);
  }, {
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries(['campgrounds']);
      navigate("/");
    },
  })

  const handleClick = async e => {
    e.preventDefault();

    const geoData = await geocoder.forwardGeocode({
      query: inputs.location,
      limit: 1
    }).send();

    const latitude = geoData.body.features[0].geometry.coordinates[0];
    const longitude = geoData.body.features[0].geometry.coordinates[1];

    const formData = new FormData();
    formData.append("images", files);

    mutation.mutate({
      "title": inputs.title,
      "latitude": latitude,
      "longitude": longitude,
      "price": inputs.price,
      "description": inputs.description,
      "location": inputs.location,
      "images": formData,
      "provinceId": 1
    })
    // setInputs("")
    // setFiles(null)
  };

  return (
    <div className="createCampground">
      <div className="container">
        <p>Crear Campamento</p>
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
          <input type="file" name="image" id="formFile" onChange={(e) => setFiles(e.target.files)} multiple />
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
          <button onClick={handleClick}>Crear</button>
        </div>
      </div>
    </div>
  )
}

export default CreateCampground
