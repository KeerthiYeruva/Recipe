export interface FormState {
  status: "" | "error" | "success";
  errors: string[];
  message?: string;
}
