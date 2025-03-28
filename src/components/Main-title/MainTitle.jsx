import React from 'react';
import './MainTitle.css';

export default function MainTitle({ title }) {
    return (
        <div className="main-title"> 
            <h1 className="titulo" title="Titulo Principal">
                {title}
            </h1>
        </div>
    )
}