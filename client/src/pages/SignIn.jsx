import { useDispatch, useSelector } from "react-redux";
import { loginAndFetchProfile } from "../apiCalls/userActions";
import { useEffect, useState } from "react";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { customButtonTheme } from "../customThemes/buttonTheme";
import GoogleAuth from "../components/GoogleAuth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {
    error: errorMessage,
    loading,
    isAuthenticated,
  } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAndFetchProfile(email, password));
  };

  return (
    <div className="py-20 min-h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
          <div className="flex h-full flex-col justify-center gap-4 p-6">
            <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
              <form
                className="flex flex-col gap-4 pb-4"
                onSubmit={handleSubmit}
              >
                <h1 className="mb-4 text-2xl font-bold  dark:text-white">
                  Log In
                </h1>
                <div>
                  <div className="mb-2">
                    <Label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor="email"
                    >
                      Email:
                    </Label>
                  </div>
                  <div className="flex w-full rounded-lg pt-1">
                    <div className="relative w-full">
                      <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        required=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                      data-testid="flowbite-label"
                      htmlFor="password"
                    >
                      Password
                    </Label>
                  </div>
                  <div className="flex w-full rounded-lg pt-1">
                    <div className="relative w-full">
                      <TextInput
                        id="password"
                        type="password"
                        name="password"
                        required=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {errorMessage && (
                    <Alert className="mt-5" color="failure">
                      {errorMessage}
                    </Alert>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    theme={customButtonTheme}
                    color="signup"
                    type="submit"
                  >
                    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                      {loading ? "Loading..." : "Login"}
                    </span>
                  </Button>
                  <GoogleAuth />
                </div>
              </form>
              <div className="min-w-[270px]">
                <div className="mt-4 text-center dark:text-gray-200">
                  New user?{" "}
                  <Link
                    to="/sign-up"
                    className="text-blue-500 hover:underline hover:text-blue-600"
                  >
                    Create account here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
