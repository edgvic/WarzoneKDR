import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if (isSignedIn){
            return(
            <nav style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '5px'}}>
                <p onClick={() => onRouteChange('signout')} className='f6 grow no-underline ph3 pv2 mb2 dib white bg-dark-green pointer'>Sign Out</p>
            </nav>
            )
        } else {
            return (
            <div>
                <nav style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '5px'}}>
                <p onClick={() => onRouteChange('signin')} className='f6 grow no-underline ph3 pv2 mb2 dib white bg-dark-green pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f6 grow no-underline ph3 pv2 mb2 dib white bg-dark-green pointer'>Register</p>
                </nav>
            </div>
            )
        }
}

export default Navigation;