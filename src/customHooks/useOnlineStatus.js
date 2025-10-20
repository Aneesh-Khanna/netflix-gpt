import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;

/*
🧠 How It Works
1. Initial State: navigator.onLine
const [isOnline, setIsOnline] = useState(navigator.onLine);


- navigator.onLine is a built-in browser property.
- It returns true if the browser is connected to the internet, false otherwise.
- This sets your initial state when the component mounts.

2. Listening for Changes
- window.addEventListener("online", ...) fires when the browser regains connection.
- window.addEventListener("offline", ...) fires when the browser loses connection.
- These update your isOnline state accordingly.
- The cleanup function (return () => ...) ensures listeners are removed when the component unmounts — preventing memory leaks.

3. Return Value
return isOnline;
- This gives your component access to the current online status.
*/