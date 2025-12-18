"use client";
import CountrySelectField from "@/components/custom/forms/CountrySelectField";
import FooterLink from "@/components/custom/forms/FooterLink";
import InputField from "@/components/custom/forms/InputField";
import SelectField from "@/components/custom/forms/SelectField";
import { Button } from "@/components/ui/button";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "IN",
      investmentGoals: undefined,
      riskTolerance: undefined,
      preferredIndustry: undefined,
    },
    mode: "onBlur",
  });

  async function onSubmit(data: SignUpFormData) {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full name is required", minLength: 2 }}
        />

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

        <CountrySelectField
          name="country"
          control={control}
          label="Country"
          error={errors.country}
          required
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />

        <SelectField
          name="preferedIndustry"
          label="Prefered Industry"
          placeholder="Select your prefered Industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

        {/* submit button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Creating Account" : "Start Your Investing Journey"}
        </Button>

        <FooterLink text="Already have an account?" linkText="Sign in" href="sign-in" />
      </form>
    </>
  );
};

export default SignUp;
