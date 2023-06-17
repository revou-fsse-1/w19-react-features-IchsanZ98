import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading";

export const Register = () => {
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [inputValid, setInputValid] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [displayError, setDisplayError] = useState({
    username: false,
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

  const validateUsername = () => {
    if (inputForm.username.length < 3) {
      setInputValid((prev) => ({
        ...prev,
        username: false,
      }));
      setDisplayError((prev) => ({
        ...prev,
        username: true,
      }));
    } else {
      setInputValid((prev) => ({
        ...prev,
        username: true,
      }));
      setDisplayError((prev) => ({
        ...prev,
        username: false,
      }));
    }
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

    validateUsername();
    validateEmail();
    validatePassword();

    if (!inputValid.username || !inputValid.email || !inputValid.password) {
      console.log("Not valid");
    } else {
      setLoading(true);
      registerUser();
    }
  };

  const registerUser = async () => {
    try {
      const response = await axios.post(
        "https://mock-api.arikmpt.com/api/user/register",
        {
          name: inputForm.username,
          email: inputForm.email,
          password: inputForm.password,
        }
      );
      console.log(response);
      setLoading(false);
      navigate("/login");
    } catch (error: any) {
      console.log(error.response.data.errors);
      setLoading(false);
    }
  };

  return (
    <>
      <section >
        <div >
          <h2 >Sign Up</h2>

          <form >
            <div >
              <label htmlFor="username" >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Johnny"
               
                onChange={(e) => handleFormInput(e)}
                onBlur={() => validateUsername()}
              />
              <span
         
              >
                Invalid username
              </span>
            </div>

            <div >
              <label htmlFor="email" >
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="myemail@gmail.com"
          
                onChange={(e) => handleFormInput(e)}
                onBlur={() => validateEmail()}
              />
              <span
            
              >
                Invalid email
              </span>
            </div>

            <div >
              <label htmlFor="password" >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
               
                onChange={(e) => handleFormInput(e)}
                onBlur={() => validatePassword()}
              />
              <span
        
              >
                Password needs at least 5 characters
              </span>
            </div>

            <div>
              <button
                type="submit"
          
                onClick={(e) => handleFormSubmit(e)}
              >
                Sign Up
              </button>
            </div>
            {loading && <Loading />}
          </form>

          <div>
            <p>Already have an account?</p>
            <Link to="/login" >
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
