import React from 'react'
import UpdateAlert from '../Alert/UpdateAlert'

const ServiceWorkerWrapper = ({children}) => {
    return (
        <React.Fragment>
            <UpdateAlert />
            {children}
        </React.Fragment>
    );
}

export default ServiceWorkerWrapper;