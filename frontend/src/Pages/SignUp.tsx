import { useNavigate } from "react-router-dom";
import { useUserSession } from "../auth/globalState";
import { useState } from "react";
import { supabase } from "../auth/googleAuth";
import { apiSignup } from "../api";
import { PageBackground, FormCard, Field, Label, Input, Button, OutlineButton, Spinner, StyledLink, Divider } from "../ui";

export default function SignUp() {
  const { setUserSession } = useUserSession((state) => state);
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://frontendhanddraw.vercel.app/dashboard",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  }

  function realTimeInput(e: any) {
    const value = e.target.value;
    if (!value) {
      e.target.style.borderColor = "black";
      return;
    }

    const atIndex = value.indexOf("@");
    const hasValidAt = atIndex > 0;
    const dotIndex = value.indexOf(".");
    const hasValidDot = dotIndex > atIndex + 1;
    const hasAfterDot = dotIndex !== -1 && dotIndex < value.length - 1;

    if (hasValidAt && hasValidDot && hasAfterDot) {
      e.target.style.borderColor = "green";
      setValidEmail(true);
    } else {
      e.target.style.borderColor = "red";
    }
  }

  async function createUser(e: any) {
    e.preventDefault();
    if (validEmail) {
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const formValues = Object.fromEntries(formData);
      console.log(formValues);
      createNewUser(formValues);
    }
  }

  async function createNewUser(formValues: object) {
    try {
      const response = await apiSignup(formValues);
      const data = response.data;
      await supabase.auth.setSession({
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      setUserSession({ accessToken: data.accessToken });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PageBackground>
      <FormCard>
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-[#d0d0d0]">
            Create Account
          </h1>
          <h2 className="text-sm text-[#555555]">
            Start drawing with your hands
          </h2>
        </header>

        <form
          onSubmit={(e) => {
            createUser(e);
          }}
          className="flex flex-col gap-4"
        >
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => {
                realTimeInput(e);
              }}
              autoComplete="off"
              type="text"
              name="email"
              id="email"
              placeholder="you@example.com"
            />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
            />
          </Field>
          {loading && validEmail ? (
            <div className="w-full py-2.5 mt-1 bg-[#d0d0d0] rounded-[5px] flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <Button className="mt-1">Sign Up</Button>
          )}
        </form>

        <Divider />

        <OutlineButton type="button" onClick={signInWithGoogle}>
          Continue with Google{" "}
        </OutlineButton>

        <div className="text-center text-sm text-[#555555]">
          <p>
            Already have an account?{" "}
            <StyledLink
              to="/login"
              className="border-none bg-transparent px-0 py-0"
            >
              Log In
            </StyledLink>
          </p>
        </div>
      </FormCard>
    </PageBackground>
  );
}
