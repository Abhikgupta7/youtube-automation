import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='loader'>
            <ColorRing
                visible={true}
                height="150"
                width="150"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
        </div>
    )
}

export default Loader