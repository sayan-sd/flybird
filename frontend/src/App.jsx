import React from "react";
import { Route, Routes } from "react-router-dom";
import Messages from "./pages/Messages";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Verification from "./pages/auth/Verification";

function App() {
    return (
        <div>
            <Routes>
                <Route index={true} element={<Messages />} />

                {/* Auth */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/verify" element={<Verification />} />
            </Routes>
        </div>
    );
}

export default App;
