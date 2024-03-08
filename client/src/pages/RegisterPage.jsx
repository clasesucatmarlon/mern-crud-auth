import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerRequest } from "../api/Auth";


const RegisterPage = () => {
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm();


  const onSubmit = handleSubmit(async (values) => {
    const response = await registerRequest(values);
    if (response.status === 200) {
      setMessage("User created succesful");
      console.log("Respuesta de registro... ", response);
    }
  });


  return (
    <div className="bg-zinc-800 max-w-md rounded-md m-10 p-10 mx-auto flex justify-center items-center">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-2">
          Register
        </button>
        {
          message ? (<p>Creado correctamente</p>) : ""
        }
      </form>
    </div>
  )
}

export default RegisterPage;