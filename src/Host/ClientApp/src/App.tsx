import * as React from 'react';
import { Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './components/pages/Home';
import Counter from './components/pages/Counter';
import FetchData from './components/pages/FetchData';

import './custom.css'
import Logout from './components/pages/Logout';
import LoginRegister from './components/pages/LoginRegisterForm';

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
