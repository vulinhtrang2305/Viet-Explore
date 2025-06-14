import React from 'react';
import App from './../App';
import AppProvider from "../../src/provider/AppProvider";

const index = () => {
  return (
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  );
};

export default index;


// import React from 'react';
// import CustomTabNavigator from '@/src/navigation/CustomTabNavigator';

// export default function TabRoot() {
//   return <CustomTabNavigator />;
// }
