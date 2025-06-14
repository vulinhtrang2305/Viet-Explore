// // // import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// // // import { useFonts } from 'expo-font';
// // // import { Stack } from 'expo-router';
// // // import { StatusBar } from 'expo-status-bar';
// // // import 'react-native-reanimated';

// // // import { useColorScheme } from '@/hooks/useColorScheme';

// // // export default function RootLayout() {
// // //   const colorScheme = useColorScheme();
// // //   const [loaded] = useFonts({
// // //     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
// // //   });

// // //   if (!loaded) {
// // //     // Async font loading only occurs in development.
// // //     return null;
// // //   }

// // //   return (
// // //     <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
// // //       <Stack>
// // //         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
// // //         <Stack.Screen name="+not-found" />
// // //       </Stack>
// // //       <StatusBar style="auto" />
// // //     </ThemeProvider>
// // //   );
// // // }



// // // app/_layout.tsx or app/layout.tsx
// // import React from 'react';
// // import { Stack } from 'expo-router';
// // import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// // import { StatusBar } from 'expo-status-bar';
// // import { useFonts } from 'expo-font';
// // import { useColorScheme } from '@/hooks/useColorScheme';

// // export default function RootLayout() {
// //     const colorScheme = useColorScheme();

// //     return (
// //         <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
// //             <Stack>
// //                 <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
// //                 <Stack.Screen name="custom" options={{ headerShown: false }} />
// //             </Stack>
// //             {/* <StatusBar style="auto" /> */}
// //         </ThemeProvider>
// //     );
// // }



// import React from 'react';
// import { Stack } from 'expo-router';
// import { ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { StatusBar } from 'expo-status-bar';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { DarkTheme, DefaultTheme } from '@react-navigation/native';

// export default function RootLayout() {
//     const [loaded] = useFonts({
//         SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     });
//     const colorScheme = useColorScheme();

//     if (!loaded) return null;

//     return (
//         <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
//             <Stack screenOptions={{ headerShown: false }}>
//                 <Stack.Screen name="(tabs)" />
//                 <Stack.Screen name="details" />
//             </Stack>
//             <StatusBar style="auto" />
//         </ThemeProvider>
//     );
// }
