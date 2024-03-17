"use client";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm, FieldErrors } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
  name: string;
};
const Auth = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    mode: "onTouched",
  });
  const [showPassword, setShowPassword] = useState(false);
  const inputStyle =
    "border border-gray-300 sm:text-sm text-black rounded-md block w-full p-2.5 focus:outline-none";

  const { register, handleSubmit, formState, reset } = form;
  const { isValid, errors, isDirty, isSubmitting, isSubmitSuccessful } =
    formState;

  const { data: session } = useSession();
  const router = useRouter();

  // this handler handle the userlogin
  const loginHandler = async (provider?: string|null) => {
    try {
      if(provider)
      await signIn(provider);
      else
      await signIn();
      
      router.push("/");

      //  is successfully signIn push the user to the home page
    } catch (err) {
      err;
      toast.error("Something Went Wrong !");
    }
  };

  // this handler handles the signUp process when the singUpForm is submitted
  const onSubmit = async (data: FormValues) => {
    try {
      const { name, email, password } = data;
      const user = await signUp({ email, password, name });
      if (user) toast.success("Account Created Successfully! Please Sign In");
    } catch (err: any) {
      console.log(err.message);
      toast.error("Something Went Wrong");
    }
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form Errors", errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    if (session) {
      router.push("/");
    }
  }, [isSubmitSuccessful, reset, session, router]);

  return (
    <section className="container mx-auto">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto">
        <div className="flex flex-col mb-8 md:flex-row items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight leading-tight md:text-2xl">
            Create an Account{" "}
          </h1>
          <p>OR</p>
          <span className="inline-flex items-center">
            <AiFillGithub
              className="cursor-pointer mr-3 text-4xl text-black dark:text-[#f5f5f5]"
              onClick={()=>loginHandler('github')}
            />
            |
            <FcGoogle
              className="cursor-pointer ml-3 text-4xl"
              onClick={()=>loginHandler('google')}
            />
          </span>
        </div>
        <form
          className=""
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
        >
          <div className="relative h-fit  flex flex-col mb-1 space-y-1">
            <input
              type="text"
              placeholder="Johd Doe"
              className={inputStyle}
              id="name"
              {...register("name", { required: "Username is required" })}
            />
            <div className="h-5 px-2 overflow-hidden m-0">
              {errors.name && (
                <p className="text-[red] font-thin text-sm">
                  {errors?.name?.message}
                </p>
              )}
            </div>
          </div>
          <div className="relative h-fit flex flex-col mb-1 space-y-1">
            <input
              type="email"
              placeholder="name@example.com"
              className={inputStyle}
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid Email",
                },
              })}
            />
            <div className="h-5 px-2 overflow-hidden m-0">
              {errors.email && (
                <p className="text-[red] font-thin text-sm">
                  {errors?.email?.message}
                </p>
              )}
            </div>
          </div>
          <div className="relative h-fit  flex flex-col mb-1 space-y-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className={inputStyle}
              id="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\^\-_`|])(?=.*[a-z])(?=.*\d).{8,}$/,
                  message:
                    "Password must contain at least one special character, one lowercase letter, and a number",
                },
                minLength: {
                  value: 6,
                  message: "Password Must Containe at least 6 characters",
                },
              })}
            />
            {!showPassword ? (
              <FaEye
                className="dark:text-[#1E1E1E] absolute right-2 top-[10px] z-10 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <FaEyeSlash
                className="dark:text-[#1E1E1E] absolute right-2 top-[10px] z-10 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            )}
            <div className="h-5 px-2 overflow-hidden m-0">
              {errors.password && (
                <p className="text-[red] font-thin text-sm">
                  {errors?.password?.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || !isDirty || isSubmitting}
            className="disabled:bg-tertiary-disable disabled:cursor-not-allowed dark:disabled:bg-sky-400 transition-all duration-500 bg-tertiary-dark dark:bg-sky-600 hover:bg-tertiary-light dark:hover:bg-sky-500 w-full focus:outline-none font-semibild rounded-md text-sm sm:text-base md:text-lg px-5 py-3 text-center text-[#f5f5f5] mb-4"
          >
            Submit
          </button>
          <button
            className="text-tertiary-dark dark:text-sky-700 underline"
            onClick={()=>loginHandler(null)}
            type="button"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
