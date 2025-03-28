import React from "react";
import Logo from "../../components/Logo";
import LoginImg from "../../assets/images/auth/login.png";
import GoogleLogo from "../../assets/images/auth/google.svg";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/slices/auth";

// validation Schema
const schema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        console.log("form data", data);
        return dispatch(LoginUser(data, navigate))
    };

    return (
        <div className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-screen">
            <div className="flex flex-wrap items-center h-full">
                {/* left part: image */}
                <div className="hidden w-full xl:block xl:w-1/2">
                    <div className="py-17.5 px-26 flex flex-col items-center">
                        <Logo />

                        <div className="mt-15">
                            <img
                                src={LoginImg}
                                alt="login"
                                className="h-115 w-auto object-cover origin-center"
                            />
                        </div>
                    </div>
                </div>

                {/* right part: form */}
                <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 xl:px-20 flex items-center justify-center">
                    <div className="w-full p-4 sm:m-12 xl:p-12 xl:pl-0">
                        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                            Login to FlyBird
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* email */}
                            <div className="mb-4">
                                <label
                                    htmlFor=""
                                    className="mb-2.5 block font-medium text-black dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black dark:text-white ${
                                        errors.email
                                            ? "border-red focus:border-red"
                                            : "border-stroke"
                                    } outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input`}
                                />
                                {errors.email && (
                                    <p className="text-red text-sm">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* password */}
                            <div className="mb-6">
                                <label
                                    htmlFor=""
                                    className="mb-2.5 block font-medium text-black dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    placeholder="Enter your password"
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black dark:text-white ${
                                        errors.password
                                            ? "border-red focus:border-red"
                                            : "border-stroke"
                                    } outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input`}
                                />
                                {errors.password && (
                                    <p className="text-red text-sm">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* submit button */}
                            <div className="mb-5">
                                <input
                                    type="submit"
                                    value={`${
                                         isLoading
                                            ? "Submitting..."
                                            : "Sign In"
                                    }`}
                                    // disabled={isLoading}
                                    className="w-full cursor-pointer border border-primary bg-primary p-4 rounded-lg text-white transition hover:bg-opacity-90"
                                />
                            </div>

                            <div className="auth-divider flex items-center text-sm text-stroke before:bg-stroke after:bg-stroke dark:text-strokedark dark:before:bg-stroke dark:after:bg-strokedark">
                                <span>OR</span>
                            </div>

                            {/* login with google */}
                            <button className="mt-5 flex w-full items-center justify-center gap-3.5 border border-stroke bg-gray p-4 rounded-lg hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                                <span className="flex gap-4">
                                    <img src={GoogleLogo} alt="google" />
                                    Login with Google
                                </span>
                            </button>

                            {/* redir to sign up */}
                            <div className="mt-6 text-center">
                                <p>
                                    Don't have an account?{" "}
                                    <Link
                                        to={"/auth/signup"}
                                        className="text-primary"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
