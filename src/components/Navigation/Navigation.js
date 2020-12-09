import React from 'react';

const Navigation = () => {
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '5px'}}>
            <p className='f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-green pointer'>Sign Out</p>
        </nav>
   );
}

export default Navigation;