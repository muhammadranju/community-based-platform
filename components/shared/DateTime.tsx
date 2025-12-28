import { format, parseISO } from "date-fns";

export const costumFormatDate = (dateString?: string) => {
  if (!dateString) return "N/A"; // Fallback if no date
  try {
    return format(parseISO(dateString), "dd/MM/yyyy");
  } catch (error) {
    return "Invalid date"; // Fallback if parsing fails
  }
};
