import { useContext, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./map.scss";
import { DarkModeContext } from "../../context/darkModeContext";

function Map({ campground }) {

    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoicmV6bWFhcnIiLCJhIjoiY2xsOHVubXZuMTZudjNybnd1Y3NseGRpbyJ9.NdjKtULmrVndUqVMNLfeQA';

        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: darkMode ? 'mapbox://styles/mapbox/navigation-night-v1' : 'mapbox://styles/mapbox/navigation-day-v1', // style URL
            center: [campground.latitude, campground.longitude],
            zoom: 12, // starting zoom
        });

        map.addControl(new mapboxgl.NavigationControl());

        new mapboxgl.Marker()
            .setLngLat([campground.latitude, campground.longitude])
            .setPopup(
                new mapboxgl.Popup({ offset: 35 })
                    .setHTML(
                        `<h4>${campground.title}</h4>
                        <p>${campground.location}</p>`
                    )
            )
            .addTo(map);

        // Cleanup function to remove map on component unmount
        // return () => map.remove();
    }, [campground]);

    return <div id="map" className='map' />;
};

export default Map;
