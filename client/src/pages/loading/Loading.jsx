import React from 'react'
import loading from './Loading.gif'
import "./loading.css"

const Loading = () => {
    return (
        <div>
            <div className="loading-screen">
                <img className='my3' src={loading} alt="Loading..." />
            </div>
        </div>
    )
}

export default Loading
