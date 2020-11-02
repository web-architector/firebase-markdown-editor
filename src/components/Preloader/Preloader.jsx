import React from 'react';

export const Preloader = () => (
    <div style={{
        position: 'fixed',
        display: 'flex',
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '2.68em',
        background: 'green',
        color: 'white'
    }}
    >
        Loading..
    </div>
);
