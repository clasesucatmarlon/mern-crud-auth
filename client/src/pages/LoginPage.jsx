import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { signin, authError } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    // console.log("Valores en login: ", values)
    await signin(values);
    reset();
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-zinc-800 rounded-md p-10 md:w-1/3">
        <p className="mb-5 text-center text-2xl">Login</p>

        {
          authError.map((error, index) => {
            return (
              <div key={index} className="w-full bg-red-500 p-2 text-white text-center rounded-md mb-1">
                {error}
              </div>
            )
          }
          )
        }

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {
            errors.email && <p className="text-red-500">Email is required</p>
          }


          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Password"
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={togglePasswordVisibility} />
            </span>
          </div>
          {
            errors.password && <p className="text-red-500">Password is required</p>
          }

          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-2">
            Login
          </button>
        </form>

        <p className="flex justify-between ">
          Do not have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage;