import { sanitize } from "dompurify";
export const sanitizeInput = (input) => {
  return sanitize(input);
};
