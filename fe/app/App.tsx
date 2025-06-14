import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '../src/navigation/AppNavigation';
import CustomTabNavigator from '@/src/navigation/CustomTabNavigator';

export default function App() {
    return (
        // <NavigationContainer>
        // <AppNavigation />
        <CustomTabNavigator />
    );
}



// import React from 'react';
// import AppProvider from "../src/provider/AppProvider";

// const App = () => {
//   return (
//     <React.StrictMode>
//       <AppProvider>
//         <App />
//       </AppProvider>
//     </React.StrictMode>
//   );
// };

// export default App;


// import React from 'react';
// import AppProvider from "../src/provider/AppProvider";
// import MainNavigation from '../src/navigation/AppNavigation'; // hoặc CustomTabNavigator

// export default function App() {
//     return (
//         <AppProvider>
//             <MainNavigation />
//         </AppProvider>
//     );
// }

// App.tsx
// import React from 'react';
// import AppProvider  from "../src/provider/AppProvider"
// import CustomTabNavigator from '../src/navigation/CustomTabNavigator'; // hoặc AppNavigation

// export default function App() {
//     return (
//         <AppProvider>
//             <CustomTabNavigator />
//         </AppProvider>
//     );
// }

