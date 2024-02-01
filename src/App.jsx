import "./style.scss"

import "./App.css"
import { createBrowserRouter, Outlet, RouterProvider, Navigate, useParams, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar"
import Campgrounds from "./pages/campgrounds/Campgrounds"
import ShowCampground from "./pages/showCampground/ShowCampground"
import EditCampground from "./pages/editCampground/EditCampground"
import CreateCampground from "./pages/createCampground/CreateCampground"
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import BookingForm from "./pages/bookingForm/BookingForm";
import BookDetails from "./pages/bookDetails/BookDetails";
import BookingList from "./pages/bookingList/BookingList";


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
      return <Navigate to="/" />;
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

  const ProtectBooking = ({ children }) => {

    const location = useLocation();
    const { state } = location;

    if (!state) {
      return <Navigate to="/" />;
    }
    return children;
  }

  const ProtectDetails = ({ children }) => {

    const { bookId } = useParams();
    //Hacer get de reservas del usuario y verificar si el bookId pertenece a alguna

    //Si no le pertenece
    // if (!state) {
    //   return <Navigate to="/" />;
    // }
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
          element: (
            <ProtectedRoute>
              <CreateCampground />
            </ProtectedRoute>
          )
        },
        {
          path: "/:id",
          element: <ShowCampground />
        },
        {
          path: "/edit/:id",
          element: (
            <ProtectedRoute>
              <ProtectEdit>
                <EditCampground />
              </ProtectEdit>
            </ProtectedRoute>
          )
        },
        {
          path: "/trips",
          element: (
            <ProtectedRoute>
              <BookingList />
            </ProtectedRoute>
          )
        },
      ]
    },
    {
      path: "/:id/reserve",
      element: (
        <QueryClientProvider client={queryClient}>
          <div className={`theme-light`}>
            <ProtectedRoute>
              <ProtectBooking>
                <BookingForm />
              </ProtectBooking>
            </ProtectedRoute>
          </div>
        </QueryClientProvider>
      )
    },
    {
      path: "/trips/:bookId",
      element: (
        <QueryClientProvider client={queryClient}>
          <div className={`theme-light`}>
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          </div>
        </QueryClientProvider>
      )
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
