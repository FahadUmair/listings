const BASE_URL =
  "https://u2joxelhel.execute-api.ca-central-1.amazonaws.com/staging/create_user";

/**
 * Sends a POST request to create a new user.
 * @param user - The user object containing username and email
 * @returns Response data from the server
 */
export const createUser = async (user: { name: string; email: string }) => {
  console.log(JSON.stringify(user));
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Email already exists");
  }

  const data = await response.json();
  return data;
};
