import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { HomePage } from "@/pages/Dashboard";
import { AuthPage } from "./pages/AuthPage";
import { SharePage } from "./pages/SharePage";
import { ProtectedRoute } from "@/components/protectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/brain/:shareHash" element={<SharePage />} />

            <Route element={<PublicRoute />}>
              <Route path="/auth" element={<AuthPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>

          </Routes>
        </ThemeProvider>
      </BrowserRouter>

      <Toaster richColors={false} position="bottom-right" />
    </>
  );
}

export default App;
