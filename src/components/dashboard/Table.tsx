import axios from "axios";
import { useNavigate } from "react-router-dom";

type TableDataProps = {
  id: string;
  name: string;
  isActive: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateCategoryData: (id: string) => void;
};

export const Table = ({
  id,
  name,
  isActive,
  setIsLoading,
  updateCategoryData,
}: TableDataProps) => {
  const navigate = useNavigate();

  const deleteSelectedData = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`https://mock-api.arikmpt.com/api/category/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      updateCategoryData(id);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <tr >
      <td >{id}</td>
      <td >{name}</td>
      <td >
        {isActive ? "yes" : "no"}
      </td>
      <td >
        <button
          onClick={() => navigate(`./${id}`)}
         
        >
          edit
        </button>
        <button
          onClick={() => deleteSelectedData()}
         
        >
          delete
        </button>
      </td>
    </tr>
  );
};
