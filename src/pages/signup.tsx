import { useState, useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { auth } from "../lib/firebaseClient";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Image from "next/image";
import { LogoSVG } from "../assets/assets";

import "react-toastify/dist/ReactToastify.css";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const actionCodeSettings = {
    url: process.env.NEXT_PUBLIC_VERIFICATION_REDIRECT_URL as string,
    handleCodeInApp: true,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setIsLoading(true);

    let isValid = true;

    setFormErrors({
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
    });

    const { email, password, confirmPassword } = formData;

    if (!email) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Can't be empty.",
      }));
      isValid = false;
    }

    if (!password) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "Can't be empty.",
      }));
      isValid = false;
    }

    if (!confirmPassword) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPasswordError: "Can't be empty.",
      }));
      isValid = false;
    }
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      sendEmailVerification(userCredential.user, actionCodeSettings)
        .then(() => {
          toast.info("Verification email sent. Check your inbox.");
          setOpen(true);
        })
        .catch((error) => {
          // Handle errors here
          toast.error(`Error sending verification email: ${error.message}`);
        });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
      });
      setFormErrors({
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
      });
      setIsLoading(false);
    }
  };

  const getInputClasses = (inputValue: string, errorName: string) => {
    let baseClasses =
      "bg-darkBlue text-white py-2 px-4 focus:outline-none w-full max-w-xs";
    let validClasses = "border-b-2 border-secondary";
    let errorClasses = "border-b-2 border-red";

    if (hasSubmitted && !inputValue && formErrors[errorName].length) {
      return `${baseClasses} ${errorClasses}`;
    }
    return `${baseClasses} ${validClasses}`;
  };

  const emailInvalid = (emailInput: string) => {
    const inputToValidate = emailInput.replace(/\s+/g, "");

    if (inputToValidate.length == 0) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "",
      }));
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Invalid email format.",
      }));
      return true;
    }
  };

  const invalidEmail = useMemo(
    () => emailInvalid(formData.email),
    [formData.email]
  );

  const invalidPasswords = (password: string, confirmPassword: string) => {
    const inputToValidate = confirmPassword.replace(/\s+/g, "");
    if (inputToValidate.length == 0) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPasswordError: "",
      }));
      return false;
    } else if (password !== confirmPassword) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPasswordError: "Passwords do not match!",
      }));
      return true;
    }
  };

  const passwordsMismatch = useMemo(
    () => invalidPasswords(formData.password, formData.confirmPassword),
    [formData.password, formData.confirmPassword]
  );

  const calculatePaddingLeft = () => {
    const totalWidth = 100;
    const textWidthPercentage = 85;
    return `${totalWidth - textWidthPercentage}%`;
  };

  const renderForm = () => {
    if (isLoading) {
      return (
        <article className="flex justify-center flex-col items-center h-screen bg-black">
          <Spinner text="Creating an account..." />;
        </article>
      );
    } else {
      return (
        <article className="flex justify-start flex-col items-center h-screen bg-black">
          <Image src={LogoSVG} alt="icon" className="mt-12" />
          <form
            className="w-11/12 bg-darkBlue rounded-xl mt-24 p-6"
            onSubmit={handleSignup}
          >
            <h1 className="text-white text-2xl">Sign Up</h1>

            <section className="mt-8 relative">
              <article
                className={`${getInputClasses(
                  formData.email,
                  "emailError"
                )} w-100`}
              >
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email address"
                  className="pr-[6rem] w-12/12 focus:outline-none bg-darkBlue "
                  aria-describedby="emailError"
                />
              </article>

              {formErrors.emailError.length > 0 && !formData.email && (
                <span
                  id="emailError"
                  className="text-red absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {formErrors.emailError}
                </span>
              )}
              {invalidEmail && (
                <span
                  id="emailError"
                  className="text-red absolute -right-3 top-1/2 transform -translate-y-1/2"
                  style={{ paddingLeft: calculatePaddingLeft() }}
                >
                  {formErrors.emailError}
                </span>
              )}
            </section>
            <section className="mt-7 relative">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={getInputClasses(formData.password, "passwordError")}
                aria-describedby="passwordError"
                style={{ paddingRight: "4rem" }}
              />
              {formErrors.passwordError.length > 0 && !formData.password && (
                <span
                  id="passwordError"
                  className="text-red absolute right-2 top-1/2 transform -translate-y-1/2"
                  style={{ paddingLeft: calculatePaddingLeft() }}
                >
                  {formErrors.passwordError}
                </span>
              )}
            </section>
            <section className="mt-7 relative">
              <article
                className={`${getInputClasses(
                  formData.confirmPassword,
                  "confirmPasswordError"
                )} w-100`}
              >
                <input
                  type="password"
                  placeholder="Repeat Password"
                  value={formData.confirmPassword}
                  className="pr-[6rem] w-10/12 focus:outline-none bg-darkBlue"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  aria-describedby="confirmPasswordError"
                />
                {formErrors.confirmPasswordError &&
                  !formData.confirmPassword && (
                    <span
                      id="confirmPasswordError"
                      className="text-red absolute right-2 top-1/2 transform -translate-y-1/2"
                      style={{ paddingLeft: calculatePaddingLeft() }}
                    >
                      {formErrors.confirmPasswordError}
                    </span>
                  )}
                {passwordsMismatch && (
                  <span
                    id="confirmPasswordError"
                    className="text-red absolute -right-6 top-1/2 transform -translate-y-1/2"
                    style={{ paddingLeft: calculatePaddingLeft() }}
                  >
                    {formErrors.confirmPasswordError}
                  </span>
                )}
              </article>
            </section>
            <button
              type="submit"
              className="mt-5 bg-red w-full text-white py-2 px-4 rounded"
            >
              Create an account
            </button>
            <p className="mt-5 flex justify-center">
              <span className="text-white">Already have an account?</span>{" "}
              <Link className="ml-2 text-red" href="/login">
                Login
              </Link>
            </p>
          </form>
        </article>
      );
    }
  };

  return renderForm();
};

export default SignupPage;
