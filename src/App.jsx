import "./style.scss"

import "./App.css"
import { createBrowserRouter, Outlet, RouterProvider, Navigate, useParams } from "react-router-dom";
import Navbar from "./components/navbar/Navbar"
import Campgrounds from "./pages/campgrounds/Campgrounds"
import ShowCampground from "./pages/showCampground/ShowCampground"
import EditCampground from "./pages/editCampground/EditCampground"
import CreateCampground from "./pages/createCampground/CreateCampground"
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider } from 'react-query'


function App() {

  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: 'flex' }}>
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const userId = 2;

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  const ProtectEdit = ({ children }) => {

    const { id } = useParams();

    //Query para obtener el userId del campground con id
    const campUserId = 2;

    const currentUserId = 2;

    const userHasPermission = campUserId === currentUserId;

    if (!userHasPermission) {
      return <Navigate to="/" />;
    }
    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <ProtectedRoute>
        <Layout />
        // </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Campgrounds />
        },
        {
          path: "/create",
          element: <CreateCampground />
        },
        {
          path: "/:id",
          element: <ShowCampground />
        },
        {
          path: "/edit/:id",
          element: (
            <ProtectEdit>
              <EditCampground />
            </ProtectEdit>
          )
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
