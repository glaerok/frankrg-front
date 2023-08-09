import React from 'react';
import { API_ENDPOINT } from './config/consts';
import { UploadPage } from './upload';

console.log('Using API at:', API_ENDPOINT);
const App = () => {
    return (
        <>
            <UploadPage />
        </>
    );
};

export default App;
