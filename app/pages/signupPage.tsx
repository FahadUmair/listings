// pages/SignupPage.tsx
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";
import { useUser } from "@/hooks/useUser"; // Using the custom hook for user creation
import { useRouter } from "expo-router"; // Navigation
import { validateUser } from "@/validators/userValidator"; // Import the validator function

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null); // Typed as string | null
  const [emailError, setEmailError] = useState<string | null>(null); // Typed as string | null

  const { handleCreateUser, loading, error } = useUser(); // Get errors from the hook
  const router = useRouter();

  const handleSubmit = async () => {
    // Clear previous errors
    setUsernameError(null);
    setEmailError(null);

    // Validate user data
    const { username: usernameValidationError, email: emailValidationError } =
      validateUser(username, email);

    if (usernameValidationError || emailValidationError) {
      // If there are validation errors, set them and don't call the API
      setUsernameError(usernameValidationError);
      setEmailError(emailValidationError);
      return;
    }

    // If validation passes, call handleCreateUser
    const data = await handleCreateUser(username, email);
    if (data) {
      router.push("/pages/listingsPage"); // Navigate to the listings page on success
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      {/* Show username error */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      {emailError && <Text style={styles.error}>{emailError}</Text>}
      {/* Show email error */}
      <Button
        title={loading ? "Loading..." : "Create Account"}
        disabled={loading}
        onPress={handleSubmit}
      />
      {/* Show general API error */}
      {error && !usernameError && !emailError && <Text style={styles.generalError}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: -5,
    marginBottom: 15,
    fontSize: 12,
  },
  generalError: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default SignupPage;
