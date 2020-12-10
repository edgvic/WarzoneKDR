import React from 'react';
import './UrlForm.css';


const UrlForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div className='ma4 mt0'>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className='f4 pa2 w-80 center' type='text' placeholder='Enter the URL of the image' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-green' onClick={onButtonSubmit}>Let's go</button>
                </div>
            </div>
        </div>
   );
}

export default UrlForm;