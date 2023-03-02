import React, { useEffect } from 'react';
// import Header from '../header/Header';
import "./CropResult.css"
import { useNavigate, useLocation } from 'react-router-dom';
import { output_descriptions, label_image_paths } from '../crops/CropOutputs';

export function CropResult() {
    const navigate = useNavigate();
    const location = useLocation();
    const locationState = location.state;

    console.log("LOCATION : ", location)
    console.log("LOCATION STATE : ", locationState)

    // Runs at Initial Render. Redirects if State is null.
    useEffect(() => {
        if(locationState==null){
            console.log("Redirecting to /crop...")
            navigate("/farmer/crops")
        }
    }, [locationState, navigate]);

    if(locationState==null){
        console.log("LocationState is null")
        return null;
    }
    
    const predicted_crop = locationState["predicted_crop"];
    const output_image_path = label_image_paths[predicted_crop];
    console.log('Image Path : ', output_image_path)

    return (
        <>
            {/* <Header /> */}
            <h1 className="reslt">Predicted Result</h1>
            <p className="crop-result-p"> You should grow <b> {predicted_crop.toUpperCase()} </b> in your farm !</p>
            <img className="crop-result-img" src={output_image_path} alt="loading" />
            <p className="crop-result-description"> {output_descriptions[predicted_crop]} </p>
            <button className="crop-try-btn" onClick={() => navigate("/farmer/crops")}> Try again ? </button>
        </>
    );
}
