import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, user, isAuthenticated, authError } = useAuth();
  const navigate = useNavigate();

  console.log("Usuario: ", user)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks")
    }
  }, [isAuthenticated]);


  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (
    <div className="flex flex-col bg-zinc-800 max-w-md rounded-md m-10 p-10 mx-auto justify-center items-center">
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
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {
          errors.username && <p className="text-red-500">Username is required</p>
        }
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {
          errors.email && <p className="text-red-500">Email is required</p>
        }
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {
          errors.password && <p className="text-red-500">Password is required</p>
        }
        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-2">
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage;