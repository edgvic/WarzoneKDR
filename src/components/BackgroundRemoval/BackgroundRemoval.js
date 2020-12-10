import React from 'react';


const BackgroundRemoval = ({ imageUrl }) => {
    return(
        <div className = "center ma">
            <div className="absolute mt2">
                <img alt="background removal" src={imageUrl} width='500px' height='auto'/>
            </div>
        </div>
   );
}
export default BackgroundRemoval;