import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "./Table";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";
import { FetchError } from "./FetchError";

type CategoryDataType = {
  id: string;
  name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState<CategoryDataType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayError, setDisplayError] = useState<boolean>(false);

  const fetchFromAPI = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://mock-api.arikmpt.com/api/category",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategoryData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setDisplayError(true);
      setIsLoading(false);
    }
  };

  const updateCategoryData = (id: string) => {
    const filtered = categoryData?.filter((data) => data.id !== id);

    setCategoryData(filtered);
  };

  useEffect(() => {
    fetchFromAPI();
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("../");
  };

  return (
    <>
      <section>
        <div>
          {isLoading ? (
            <Loading />
          ) : displayError ? (
            <FetchError />
          ) : (
            <>
              <div>
                <button onClick={() => navigate("./add")}>Add Data</button>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Is Active</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData?.map((data) => (
                    <Table
                      key={data.id}
                      id={data.id}
                      name={data.name}
                      isActive={data.is_active}
                      setIsLoading={setIsLoading}
                      updateCategoryData={updateCategoryData}
                    />
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <button onClick={() => logoutUser()}>Logout</button>
      </section>
    </>
  );
};
