import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, AuthPage } from "./pages";
import ProtectedRoute from "./components/protected-route";
import NavBar from "./components/nav-bar";

function App() {
  return (
    <div className="min-h-screen w-full">
      <NavBar />
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
