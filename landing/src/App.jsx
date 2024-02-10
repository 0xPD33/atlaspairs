import "./App.css";
import {
  RouterProvider,
  Route,
  Outlet,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import { WalletProvider } from "./providers";

import Home from "./routes/Home";
import Presale from "./components/Presale";
import Nav from "./components/Nav";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="/presale" element={<Presale />} /> */}
      </Route>
    )
  );

  return (
    <WalletProvider>
      <RouterProvider router={router} />
    </WalletProvider>
  );
};

const Layout = () => (
  <>
    <Nav />
    <Outlet />
  </>
);

export default App;
