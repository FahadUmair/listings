import { useState } from "react";
import { createUser } from "@/api/userApi";

// Hook for managing user creation
export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handler function to create a new user
  // @param name - The name of the user to create
  // @param email - The email of the user to create
  // @returns The created user data if successful
  const handleCreateUser = async (name: string, email: string) => {
    setLoading(true);
    setError(null);

    try {
      // Call API to create user
      const data = await createUser({ name, email });
      setLoading(false);
      return data;
    } catch (err) {
      setError(err+"");
      setLoading(false);
    }
  };

  return { handleCreateUser, loading, error };
};
