import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const initialState = {
    isLoading: false,
    error: null,
    token: null,
    user: {},
    isLoggedIn: false,
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        loginSuccess(state, action) {
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        logoutSuccess(state, action) {
            state.token = null;
            state.user = {};
            state.isLoggedIn = false;
        },
    },
});

export default slice.reducer;
const { setError, setLoading, loginSuccess, logoutSuccess } = slice.actions;

// Register user
export function RegisterUser(formData, navigate) {
    return async (dispatch, getState) => {
        dispatch(setError(null));
        dispatch(setLoading(true));

        // make api call
        await axios
            .post("/auth/signup", {...formData}, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(function (response) {
                console.log(response);
                toast.success(response.data.message);
            })
            .catch(function (error) {
                console.error(error);
                dispatch(setError(error));
                toast.error(error?.message || "Something went wrong");
            })
            .finally(() => {
                dispatch(setLoading(false));
                if (!getState().auth.error) {
                    console.log("getstate", getState)
                    navigate(`/auth/verify?email=${formData.email}`);
                    // navigate('/auth/verify');
                }
            });
    };
}

// Resend OTP
export function ResendOTP(email) {
    return async (dispatch, getState) => {
        dispatch(setError(null));
        dispatch(setLoading(true));

        // make api call
        await axios
            .post(
                "/auth/resend-otp",
                {
                    email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                console.log(response.data);
                toast.success(response.data.message);
            })
            .catch(function (error) {
                console.error(error);
                dispatch(setError(error));
                toast.error(error?.message || "Something went wrong");
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };
}

// Verify OTP
export function VerifyOTP(formValues, navigate) {
    return async (dispatch, getState) => {
        dispatch(setError(null));
        dispatch(setLoading(true));

        // make api call
        await axios
            .post("/auth/verify", {...formValues}, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(function (response) {
                console.log(response.data);

                const { token, message } = response.data;
                dispatch(loginSuccess(token));

                toast.success(message || "OTP Verified Successfully");
            })
            .catch(function (error) {
                console.error(error);
                dispatch(setError(error));
                toast.error(error?.message || "Something went wrong");
            })
            .finally(() => {
                dispatch(setLoading(false));
                if (!getState().auth.error) {
                    navigate("/");
                }
            });
    };
}

// Login user
export function LoginUser(formValues, navigate) {
    return async (dispatch, getState) => {
        dispatch(setError(null));
        dispatch(setLoading(true));

        // make api call
        await axios
            .post(
                "/auth/login",
                { ...formValues },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                console.log(response.data);

                const { token, message } = response.data;
                dispatch(loginSuccess(token));

                toast.success(message || "Login Successfully");
            })
            .catch(function (error) {
                console.error(error);
                dispatch(setError(error));
                toast.error(error?.message || "Something went wrong");
            })
            .finally(() => {
                dispatch(setLoading(false));
                if (!getState().auth.error) {
                    navigate("/");
                }
            });
    };
}


// Logout user
export function LogoutUser(navigate) {
    return async (dispatch, getState) => {
        try {
            dispatch(logoutSuccess());
            navigate("/auth/login");
            toast.success("Logged out successfully");
        } catch (error) {
            console.log(error);
        }
    }
}