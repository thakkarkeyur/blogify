import React from "react";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { registerUserAction } from "../../../redux/slices/users/usersSlices";

// Form Schema (Validations)
const formSchema = Yup.object({
  firstName: Yup.string().required("First name is required!"),
  lastName: Yup.string().required("Last name is required!"),
  email: Yup.string().required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

// Register
const Register = () => {
  // Dispath
  const dispatch = useDispatch();

  // Formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: values => {
      // Dispath the action
      dispatch(registerUserAction(values));
      console.log(values);
    },
    validationSchema: formSchema,
  });

  // Select state from the store
  const storeData = useSelector(store => store?.users);
  const { loading, appErr, serverErr, registered } = storeData;

  // Redirect
  if (registered) {
    return <Redirect to="/profile" />;
  }

  return (
    <section className="relative py-20 2xl:py-40 bg-[#F9F8F9] overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="max-w-md">
                <h2 className="leading-tight font-nunito font-extrabold mt-8 mb-12 text-5xl font-heading text-[#221638]">
                  A few clicks away from creating your own blog
                </h2>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="px-6 lg:px-16 py-12 lg:py-12 bg-white rounded-lg shadow-[0_0_10px_rgba(51,51,51,0.1)]">
                <form onSubmit={formik.handleSubmit}>
                  <h3 className="mb-10 text-4xl text-[#221638] font-bold font-heading">
                    Register
                    {/* Display error message */}
                    {appErr || serverErr ? (
                      <div className="mt-4 text-lg text-[#FE4A55]">
                        {serverErr}! {appErr}
                      </div>
                    ) : null}
                  </h3>

                  {/* First name */}
                  <div className="flex items-center mt-3 mb-1 bg-[#f5f5f5] rounded">
                    <input
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                      className="w-full pl-4 pr-6 py-3 placeholder-gray-400 bg-[#f5f5f5] rounded focus:bg-white focus:outline outline-[#FE4A55] outline-1"
                      type="firstName"
                      placeholder="First Name"
                    />
                  </div>
                  {/* Error Message */}
                  <div className="text-[#FE4A55] mb-2">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                  {/* Last name */}
                  <div className="flex items-center mt-3 mb-1 bg-[#f5f5f5] rounded">
                    <input
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                      className="w-full pl-4 pr-6 py-3 placeholder-gray-400 bg-[#f5f5f5] rounded focus:bg-white focus:outline outline-[#FE4A55] outline-1"
                      type="lastName"
                      placeholder="Last Name"
                    />
                  </div>
                  {/* Error Message */}
                  <div className="text-[#FE4A55] mb-2">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
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

                  {/* Check for loading */}
                  {loading ? (
                    <button
                      disabled
                      className="py-3 w-full bg-[#221638] text-white font-bold rounded transition duration-200"
                    >
                      Loading...Please wait...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="py-3 w-full bg-[#FE4A55] hover:bg-[#221638] text-white font-bold rounded transition duration-200"
                    >
                      Register
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
