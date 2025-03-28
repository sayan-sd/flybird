import React from "react";
import Logo from "../../components/Logo";
import SignupImg from "../../assets/images/auth/signup.png";
import GoogleLogo from "../../assets/images/auth/google.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterUser } from "../../redux/slices/auth";

// validation Schema
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading } = useSelector((state) => state.auth);

    const onSubmit = (formData) => {
        console.log("form data", formData);
        dispatch(RegisterUser(formData, navigate));
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    return (
        <div className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-screen">
            <div className="flex flex-wrap items-center h-full">
                {/* left part: image */}
                <div className="hidden w-full xl:block xl:w-1/2">
                    <div className="py-17.5 px-26 flex flex-col items-center">
                        <Logo />

                        <div className="mt-15">
                            <img
                                src={SignupImg}
                                alt="login"
                                className="h-auto w-80 object-cover origin-center"
                            />
                        </div>
                    </div>
                </div>

                {/* right part: form */}
                <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 xl:px-20 xl:pb-0 flex items-center justify-center">
                    <div className="w-full p-4 sm:m-12 xl:p-0 xl:pl-0">
                        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                            Sign Up to FlyBird
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* name */}
                            <div className="mb-4">
                                <label
                                    htmlFor=""
                                    className="mb-2.5 block font-medium text-black dark:text-white"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    placeholder="Enter your full name"
                                    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black dark:text-white ${
                                        errors.name
                                            ? "border-red focus:border-red"
                                            : "border-stroke"
                                    } outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input`}
                                />
                                {errors.name && (
                                    <p className="text-red text-sm">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

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
                                    {...register("email")}
                                    placeholder="Enter your email"
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

                            {/* login button */}
                            <div className="mb-5">
                                <button
                                    type="submit"
                                    // disabled={isSubmitting || isLoading}
                                    className="w-full cursor-pointer border border-primary bg-primary p-4 rounded-lg text-white transition hover:bg-opacity-90"
                                >
                                    {isSubmitting || isLoading ? "Submitting..." : "Create Account"}
                                </button>
                            </div>

                            <div className="auth-divider flex items-center text-sm text-stroke before:bg-stroke after:bg-stroke dark:text-strokedark dark:before:bg-stroke dark:after:bg-strokedark">
                                <span>OR</span>
                            </div>

                            {/* login with google */}
                            <button className="mt-5 flex w-full items-center justify-center gap-3.5 border border-stroke bg-gray p-4 rounded-lg hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                                <span className="flex gap-4">
                                    <img src={GoogleLogo} alt="google" />
                                    Sign with Google
                                </span>
                            </button>

                            {/* redir to sign up */}
                            <div className="mt-6 text-center">
                                <p>
                                    Already have an account?{" "}
                                    <Link
                                        to={"/auth/login"}
                                        className="text-primary"
                                    >
                                        Login
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

export default Signup;
