"use server";

import { success } from "better-auth";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";
import { headers } from "next/headers";

export const signUpWithEmail = async ({
  email,
  country,
  fullName: name,
  investmentGoals,
  password,
  preferredIndustry,
  riskTolerance,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email: email, password: password, name },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }

    return { success: true, data: response };
  } catch (err) {
    console.error("Sign-up failed", err);
    return { success: false, error: "Sign-up failed" };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password },
    });

    return { success: true, data: response };
  } catch (err) {
    console.error("Sign-in failed", err);
    return { success: false, error: "Sign-in failed" };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.error("Sign-out failed", error);
    return { success: false, error: "Sign-out failed" };
  }
};
