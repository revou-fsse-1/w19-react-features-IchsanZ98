import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../Loading";
import axios from "axios";
import * as Yup from "yup";

export const SignInForm = () => {
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });
  const [displayError, setDisplayError] = useState({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(5, "Password needs at least 5 characters")
      .required("Password is required"),
  });

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleFormSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      await validationSchema.validate(inputForm, { abortEarly: false });
      setLoading(true);
      signInUser();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setDisplayError(errors);
      }
    }
  };

  const signInUser = async () => {
    try {
      const response = await axios.post(
        "https://mock-api.arikmpt.com/api/user/login",
        {
          email: inputForm.email,
          password: inputForm.password,
        }
      );

      localStorage.setItem("token", response.data.data.token);
      setLoading(false);

      navigate("/dashboard");
    } catch (error: any) {
      console.log(error.response.data.errors);
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <div>
          <h2>Login</h2>

          <form>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="myemail@gmail.com"
                onChange={(e) => handleFormInput(e)}
              />
              {displayError.email && <span>{displayError.email}</span>}
            </div>

            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                onChange={(e) => handleFormInput(e)}
              />
              {displayError.password && <span>{displayError.password}</span>}
            </div>

            <div>
              <button type="submit" onClick={(e) => handleFormSubmit(e)}>
                Login
              </button>
            </div>
            {loading && <Loading />}
          </form>

          <div>
            <p>Don't have an account yet?</p>
            <Link to="/register">
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
