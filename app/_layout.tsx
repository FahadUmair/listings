
import { Stack } from 'expo-router';
export default function RootLayout() {
  

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingTop: 20,
        },
      }}
    />
  );
}
