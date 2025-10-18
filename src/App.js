import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appStore from "./utils/ReduxStore/appStore";
import Login from "./components/Login";
import Browse from "./components/Browse";
import Watch from "./components/Watch";

function App() {
  // Create router at App level
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/watch/:movieId", 
      element: <Watch/>,
    },
  ]);

  //Providing redux store to whole app
  //which includes router
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;

