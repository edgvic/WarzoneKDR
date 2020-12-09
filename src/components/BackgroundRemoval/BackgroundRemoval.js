import React from 'react';


const BackgroundRemoval = ({ imageUrl }) => {
    return(
        <div className = "center">
            <img alt="background removal" src={imageUrl}/>
        </div>
   );
}
export default BackgroundRemoval;