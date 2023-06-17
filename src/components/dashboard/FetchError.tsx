import { useNavigate } from "react-router-dom";

export const FetchError = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>ERROR</h2>
      <p>Unable to fetch data</p>
      <button onClick={() => navigate("../dashboard")}>
        <span>Go Back</span>
      </button>
    </div>
  );
};
