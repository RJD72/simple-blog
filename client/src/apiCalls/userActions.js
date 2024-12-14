import {
  signInFailure, // Redux action to handle login failure
  signInStart, // Redux action to indicate the start of the login process
  signInSuccess, // Redux action to handle successful login and profile fetch
} from "../redux/user/userSlice";
const apiBaseUrl = import.meta.env.VITE_API_URL;

// Thunk action to handle user login and fetch profile data
export const loginAndFetchProfile = (email, password) => async (dispatch) => {
  if (!email || !password) {
    return dispatch(signInFailure("Please fill out all fields."));
  }

  // Dispatch the start action to indicate the login process has started
  dispatch(signInStart());

  try {
    // Step 1: Perform login
    // Send a POST request to the backend login endpoint with the user's email and password
    const loginResponse = await fetch(`${apiBaseUrl}/api/auth/login`, {
      method: "POST", // HTTP method for creating a login session
      headers: {
        "Content-Type": "application/json", // Specify JSON as the content type
      },
      body: JSON.stringify({ email, password }), // Send the user's credentials in the request body
    });

    // Parse the JSON response from the server
    const loginData = await loginResponse.json();

    // If the login response status is not successful, throw an error with the message from the response
    if (!loginResponse.ok) {
      throw new Error(loginData.message || "Login Failed");
    }

    // Extract userId and token from the login response data
    const { userId, token } = loginData;

    // Step 2: Fetch user profile
    // Use the userId to fetch the logged-in user's profile data
    const profileResponse = await fetch(
      `${apiBaseUrl}/api/user/get-user/${userId}`,
      {
        method: "GET", // HTTP method to retrieve user data
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
        },
      }
    );

    // Parse the JSON response from the server
    const profileData = await profileResponse.json();

    // If the profile response status is not successful, throw an error with the message from the response
    if (!profileResponse.ok) {
      throw new Error(profileData.message || "Failed to fetch profile");
    }

    // Dispatch the success action with the fetched profile data
    dispatch(signInSuccess(profileData.data));
  } catch (error) {
    // Catch any errors that occur during the login or profile fetch process
    // Dispatch the failure action with the error message
    dispatch(signInFailure(error.message));
  }
};
