import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout";
import { HomePage } from "./pages/home";
import { CreateUser } from "./pages/create-user";
import { AllUser } from "./pages/all-user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="all-user" element={<AllUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
