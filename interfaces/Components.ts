import React, { FormEvent } from "react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

interface Errors {
  error: string;
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface LayoutProps {
  children: React.ReactNode;
}

export interface RegisterFormProps {
  errors: Errors;
  handleSubmit: (event: FormEvent) => Promise<void>;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
}

export interface LogInFormProps {
  errors: Errors;
  handleSubmit: (event: FormEvent) => Promise<void>;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
}
