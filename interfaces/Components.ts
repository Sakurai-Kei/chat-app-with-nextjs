import { FormEvent } from "react";

interface Errors {
  error: string;
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
