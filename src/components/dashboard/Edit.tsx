import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../Loading";
import { FetchError } from "./FetchError";

type InputFormType = {
  name: string;
  is_active: boolean;
};

type InputValidationType = {
  name: boolean;
};

export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputForm, setInputForm] = useState<InputFormType>({
    name: "",
    is_active: false,
  });
  const [inputValid, setInputValid] = useState<InputValidationType>({
    name: false,
  });
  const [displayError, setDisplayError] = useState<InputValidationType>({
    name: false,
  });
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  };

  const validateInput = () => {
    if (inputForm.name.length < 3) {
      setInputValid((prev) => ({
        ...prev,
        name: false,
      }));
      setDisplayError((prev) => ({
        ...prev,
        name: true,
      }));
    } else {
      setInputValid((prev) => ({
        ...prev,
        name: true,
      }));
      setDisplayError((prev) => ({
        ...prev,
        name: false,
      }));
    }
  };

  const handleFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    validateInput();

    if (!inputValid.name) {
      console.log("Not valid");
    } else {
      setLoading(true);
      updateData();
    }
  };

  const fetchCurrentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://mock-api.arikmpt.com/api/category/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setInputForm({
        name: response.data.data.name,
        is_active: response.data.data.is_active,
      });
      setLoading(false);
    } catch (error) {
      setFetchError(true);
      setLoading(false);
    }
  };

  const updateData = async () => {
    try {
      await axios.put(
        "https://mock-api.arikmpt.com/api/category/update",
        {
          ...inputForm,
          name: inputForm.name.trim(),
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLoading(false);
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error.response.data.errors);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentData();
  }, []);

  return (
    <>
      <section>
        <div >
          {loading ? (
            <Loading />
          ) : fetchError ? (
            <FetchError />
          ) : (
            <>
              <h2 >Edit Data</h2>

              <form >
                <div >
                  <label htmlFor="name" >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="..."
                    required
                    value={inputForm.name}
            
                    onChange={(e) => handleFormInput(e)}
                    onBlur={() => validateInput()}
                  />
                  <span
                  
                  >
                    Name needs at least 3 characters
                  </span>
                </div>

                <div >
                  <label htmlFor="isActive" >
                    Is Active
                  </label>
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={inputForm.is_active}
                  
                    onChange={(e) =>
                      setInputForm((prev) => ({
                        ...prev,
                        is_active: e.target.checked,
                      }))
                    }
                  />
                </div>

                <div >
                  <button
                    onClick={(e) => handleFormSubmit(e)}
                  >
                    Update Data
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
};
