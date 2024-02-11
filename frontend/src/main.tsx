import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from "./providers/AuthProvider/AuthProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import Home from "./pages/Home/Home.tsx";
import Logout from "./pages/Logout/Logout.tsx";
import Verify from "./pages/Verify/Verify.tsx";
import Register from "./pages/Register/Register.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path={'/signin'} element={ <Login /> }/>
                <Route path={'/signup'} element={ <Register /> }/>
                <Route path={'/signout'} element={ <Logout /> }/>/
                <Route path={'/verify'} element={ <Verify /> }/>
                <Route path={'/'} element={ <Home /> }/>
            </Routes>
        </BrowserRouter>
    </AuthProvider>,
)
