import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUserAction } from "../../../redux/slices/users/usersSlices";
import { Redirect } from "react-router-dom";

// Form Schema (Validations)
const formSchema = Yup.object({
  email: Yup.string().required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

const Login = () => {
    // Dispath
    const dispatch = useDispatch();

   // Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => {
      // Dispath the action
      dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });
  
  // Redirect
  const store = useSelector(state => state?.users);
  const { userAuth, loading, serverErr, appErr } = store;
  
  if (userAuth) return <Redirect to="/profile" />;
  
  return (
    <>
      <section className="min-h-screen relative py-20 2xl:py-40 bg-[#F9F8F9] overflow-hidden">
        <div className="relative container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full lg:w-2/5 px-4">
                <div className="px-6 lg:px-16 py-12 lg:py-12 bg-white rounded-lg shadow-[0_0_10px_rgba(51,51,51,0.1)]">
                  {/* Form */}
                  <form onSubmit={formik.handleSubmit}>
                    <h3 className="mb-10 text-4xl text-[#221638] font-bold font-heading">
                      {/* Header */}
                      Login
                    </h3>
                    {/* Display Error */}
                    {serverErr || appErr ? (
                      <h2 className="mt-4 text-lg text-[#FE4A55]">
                        {serverErr} - {appErr}
                      </h2>
                    ) : null}

                    {/* Email */}
                    <div className="flex items-center mt-3 mb-1 bg-[#f5f5f5] rounded">
                      <input
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        className="w-full pl-4 pr-6 py-3 placeholder-gray-400 bg-[#f5f5f5] rounded focus:bg-white focus:outline outline-[#FE4A55] outline-1"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    {/* Error Message */}
                    <div className="text-[#FE4A55] mb-2">
                      {formik.touched.email && formik.errors.email}
                    </div>

                    {/* Password */}
                    <div className="flex items-center mt-3 mb-1 bg-[#f5f5f5] rounded">                     
                      <input
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                        className="w-full pl-4 pr-6 py-3 placeholder-gray-400 bg-[#f5f5f5] rounded focus:bg-white focus:outline outline-[#FE4A55] outline-1"
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                    {/* Error Message */}
                    <div className="text-[#FE4A55] mb-2">
                      {formik.touched.password && formik.errors.password}
                    </div>

                    <div className="inline-flex mb-12"></div>
                    
                    {/* Login Button */}
                    {loading ? (
                      <button
                        disabled
                        className="py-3 w-full bg-[#221638] text-white font-bold rounded transition duration-200"
                      >
                        Loading...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="py-3 w-full bg-[#FE4A55] hover:bg-[#221638] text-white font-bold rounded transition duration-200"
                      >
                        Login
                      </button>
                    )}
                  </form>
                </div>
              </div>
              <div className="w-full lg:w-3/5 px-4 mb-16 lg:mb-0 order-first lg:order-last">
                <h2 className="leading-tight font-nunito font-extrabold text-[#221638] mb-8 text-center text-4xl lg:text-5xl font-heading">
                  Hello Again!
                </h2>
                <h2 className="leading-tight font-nunito font-extrabold mt-8 mb-8 text-5xl text-center font-heading text-[#221638]">
                  Welcome back you've been missed!
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
