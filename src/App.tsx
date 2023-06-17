import { Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ErrorPage } from "./components/ErrorPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Edit } from "./components/dashboard/Edit";
import { AuthRoute } from "./components/AuthRoute";
import { Add } from "./components/dashboard/Add";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <div >
      <div >
        <Routes>
          <Route path="/" element={<AuthRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:id" element={<Edit />} />
            <Route path="/dashboard/add" element={<Add />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
