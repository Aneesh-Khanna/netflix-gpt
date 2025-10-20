import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appStore from "./utils/ReduxStore/appStore";
import Login from "./components/Login";
import Browse from "./components/Browse";
import Watch from "./components/Watch";
import useOnlineStatus from './customHooks/useOnlineStatus';
import CustomOfflinePage from './components/CustomOfflinePage';

function App() {
  // Create router at App level
  const isOnline = useOnlineStatus();
  
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
      {/* Conditional render based on online status */}
      {!isOnline ? (
        <CustomOfflinePage />
      ) : (
        <RouterProvider router={appRouter} />
      )}
    </Provider>
  );
}

export default App;

