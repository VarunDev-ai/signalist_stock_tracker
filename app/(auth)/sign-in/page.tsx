"use client";

import FooterLink from "@/components/custom/forms/FooterLink";
import InputField from "@/components/custom/forms/InputField";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  async function onSubmit(data: SignInFormData) {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="form-title">Log In Your Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="john@email.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            messaage: "Email address is required",
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          register={register}
          type="password"
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
        />

        {/* submit button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Creating Account" : "Start Your Investing Journey"}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Sign up"
          href="sign-up"
        />
      </form>
    </>
  );
};

export default SignIn;
