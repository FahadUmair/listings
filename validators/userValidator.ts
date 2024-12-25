export const validateUser = (username: string, email: string) => {
  const errors: { username: string | null; email: string | null } = {
    username: null,
    email: null,
  };

  // Validate username
  if (username.length < 4) {
    errors.username = "Username must be at least 4 characters";
  }

  // Validate email
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!emailRegex.test(email)) {
    errors.email = "Invalid email format";
  }

  return errors; // Return both errors together
};
