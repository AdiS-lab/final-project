import { useNavigate } from "react-router-dom";
import { useUserSession } from "../auth/globalState";
import { useState } from "react";
import { supabase } from "../auth/googleAuth";
import { apiLogin } from "../api";
import { PageBackground, FormCard, Field, Label, Input, Button, OutlineButton, Spinner, StyledLink, Divider } from "../ui";

export default function Login() {
  const { setUserSession } = useUserSession((state) => state);
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();

  async function handleLoginGoogle() {
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
      e.target.style.borderColor = "#303036";
      return;
    }

    const atIndex = value.indexOf("@");
    const hasValidAt = atIndex > 0;
    const dotIndex = value.indexOf(".");
    const hasValidDot = dotIndex > atIndex + 1;
    const hasAfterDot = dotIndex !== -1 && dotIndex < value.length - 1;

    if (hasValidAt && hasValidDot && hasAfterDot) {
      e.target.style.borderColor = "green";
    } else {
      e.target.style.borderColor = "red";
    }
  }

  async function logIn(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const sendData = Object.fromEntries(formData);
      const response = await apiLogin(sendData);
      const data = response.data;
      await supabase.auth.setSession({
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      setUserSession({ accessToken: data.accessToken });
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      console.log(error.response.data);
      setLoading(false);
    }
  }

  return (
    <PageBackground>
      <FormCard>
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-[#d0d0d0]">Welcome Back</h1>
          <h2 className="text-sm text-[#555555]">Log in to continue drawing</h2>
        </header>

        <form
          onSubmit={(e) => {
            logIn(e);
          }}
          className="flex flex-col gap-4"
        >
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              onFocus={(e) => {
                realTimeInput(e);
              }}
              name="email"
              id="email"
              type="text"
              placeholder="you@example.com"
            />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="••••••••"
            />
          </Field>
          {loading ? (
            <div className="w-full py-2.5 mt-1 bg-[#d0d0d0] rounded-[5px] flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <Button type="submit" className="mt-1">Sign In</Button>
          )}
        </form>

        <Divider />

        <OutlineButton type="button" onClick={handleLoginGoogle}>
          Continue with Google
        </OutlineButton>

        <div className="text-center text-sm text-[#555555]">
          <p>
            Don't have an account?{" "}
            <StyledLink to="/signup" className="border-none bg-transparent px-0 py-0">
              Sign Up
            </StyledLink>
          </p>
        </div>
      </FormCard>
    </PageBackground>
  );
}
