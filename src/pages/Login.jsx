import { toast, ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";



const schema = yup.object({
  identifier: yup.string().email().required(),
  password: yup.string().required().min(8).max(12)
})


const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });



  async function formSubmit(user) {
    
    try {
      const response = await clinet.post("/api/auth/local", user)
      localStorage.setItem("token", response.data.jwt);
      console.log("hiiii")
      toast.success("user added successfull", {
        type: "success",
      });
    } catch (error) {
      toast.error(error, {
        type: "error",
      });
    }
  }


  // const formSubmit = ({ username }) => {
  //   console.log(username)
  // }









  return (
    
      <div className="flex flex-col justify-center items-center min-h-screen">

        <form action="" onSubmit={handleSubmit(formSubmit)}   className=" flex flex-col justify-center items-center shadow-xl w-100 min-h-scrren h-120 rounded-2xl bg-pink-100 gap-2">
          <img src="./src/assets/logo.svg" alt="" className="w-50 h-50 ml-50 " />
          <h4 className="text-2xl mb-5 mr-60">Login</h4>


          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email"   {...register("identifier")}/>
          </label>
          {errors?.identifier ? (
            <span className="text-error">{errors.identifier.message}</span>
          ) : null}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className="grow"  {...register("password")} />
          </label>
          {errors?.password?(
          <span>{errors.password.message}</span>
        ): null}

          <button className="mt-5  rounded-xl p-2 w-20 bg-orange-200">Login</button>
        </form>
        <ToastContainer />
      </div>
    
  )
};

export default Login;
