import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Loading } from "../Loading";

type InputFormType = {
  name: string;
  is_active: boolean;
};

type InputValidationType = {
  name: boolean;
};

export const Add = () => {
  const navigate = useNavigate();
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

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value.trim(),
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
      createNewData();
    }
  };

  const createNewData = async () => {
    try {
      await axios.post(
        "https://mock-api.arikmpt.com/api/category/create",
        {
          ...inputForm,
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

  return (
    <>
      <section>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <h2>Add Data</h2>

              <form>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="..."
                    required
                    onChange={(e) => handleFormInput(e)}
                    onBlur={() => validateInput()}
                  />
                  <span>Name needs at least 3 characters</span>
                </div>

                <div>
                  <label htmlFor="isActive">Is Active</label>
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    onChange={(e) =>
                      setInputForm((prev) => ({
                        ...prev,
                        is_active: e.target.checked,
                      }))
                    }
                  />
                </div>

                <div>
                  <button onClick={(e) => handleFormSubmit(e)}>
                    Add New Data
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
