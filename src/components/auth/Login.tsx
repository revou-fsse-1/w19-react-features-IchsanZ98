import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../Loading";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });
  const [inputValid, setInputValid] = useState({
    email: false,
    password: false,
  });
  const [displayError, setDisplayError] = useState({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!inputForm.email.match(emailRegex)) {
      setInputValid((prev) => ({
        ...prev,
        email: false,
      }));
      setDisplayError((prev) => ({
        ...prev,
        email: true,
      }));
    } else {
      setInputValid((prev) => ({
        ...prev,
        email: true,
      }));
      setDisplayError((prev) => ({
        ...prev,
        email: false,
      }));
    }
  };

  const validatePassword = () => {
    if (inputForm.password.length < 5) {
      setInputValid((prev) => ({
        ...prev,
        password: false,
      }));
      setDisplayError((prev) => ({
        ...prev,
        password: true,
      }));
    } else {
      setInputValid((prev) => ({
        ...prev,
        password: true,
      }));
      setDisplayError((prev) => ({
        ...prev,
        password: false,
      }));
    }
  };

  const handleFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (!inputValid.email || !inputValid.password) {
      console.log("Not valid");
    } else {
      setLoading(true);
      signInUser();
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
                onBlur={() => validateEmail()}
              />
              <span>Invalid email</span>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                onChange={(e) => handleFormInput(e)}
                onBlur={() => validatePassword()}
              />
              <span>Password needs at least 5 characters</span>
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
