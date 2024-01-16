import { useState } from "react";
import "./clickableImage.scss";

function ClickableImage({ src, handlePicSelection }) {

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (src) => {
        setIsClicked(!isClicked);
        handlePicSelection(src);
    };

    return (
        <img style={{ border: isClicked ? "4px solid #ff3370" : "" }} src={src} onClick={() => handleClick(src)} alt="" />
    )
}

export default ClickableImage