import * as React from 'react';
import { Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.css'
import Logout from './components/Logout';
import LoginRegister from './components/LoginRegisterForm';

export default () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/counter' element={<Counter />} />
                <Route path='/fetch-data/:startDateIndex?' element={<FetchData />} />
                <Route path='/Logout' element={<Logout />} />
                <Route path='/Register' element={<LoginRegister isLogin={false} />} />
                <Route path='/Login' element={<LoginRegister isLogin={true} />} />
            </Routes>
        </Layout>
    )
};
