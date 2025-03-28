// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { Provider as ReduxProvider } from "react-redux";
import {store} from "./redux/store.js";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
            <Toaster />
        </BrowserRouter>
    </ReduxProvider>
    // </StrictMode>
);
