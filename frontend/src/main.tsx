import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from "./providers/AuthProvider/AuthProvider.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import Home from "./pages/Home/Home.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path={'/signin'} element={ <Login /> }/>
                <Route path={'/'} element={ <Home /> }/>
            </Routes>
        </BrowserRouter>
    </AuthProvider>,
)
