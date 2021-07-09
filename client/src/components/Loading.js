import React from 'react';

const Loading = () => {
    return (
        <div className="text-center">
            <div className='loader'>
                <p className="ts_secondary_color">Loading...</p>
                <div className='loader-inner'></div>
                <div className='loader-inner'></div>
                <div className='loader-inner'></div>
            </div>
        </div>
    );
};

export default Loading;
