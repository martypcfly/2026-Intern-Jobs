export const TABLES = [
  {
    path: "../../../README.md",
    salary: true,
    interval: "hr",
    query: {
      job_type: "intern",
      is_usa: false, // Changed to false to get international positions
      location_filter: "Canada", // Added location filter for Canada
    },
  },
  {
    path: "../../../NEW_GRAD_USA.md", // Note: This file will now contain Canada positions
    salary: true,
    interval: "yr",
    query: {
      job_type: "new_grad",
      is_usa: false, // Changed to false to get international positions
      location_filter: "Canada", // Added location filter for Canada
    },
  },
  {
    path: "../../../INTERN_INTL.md",
    salary: false,
    interval: undefined,
    query: {
      job_type: "intern",
      is_usa: false,
      location_filter: "Canada", // Added location filter for Canada
    },
  },
  {
    path: "../../../NEW_GRAD_INTL.md",
    salary: false,
    interval: undefined,
    query: {
      job_type: "new_grad",
      is_usa: false,
      location_filter: "Canada", // Added location filter for Canada
    },
  },
] as const;

export const HEADERS = ["Company", "Position", "Location", "Posting", "Age"];

export const MARKERS = {
  faang: {
    start: "<!-- TABLE_FAANG_START -->",
    end: "<!-- TABLE_FAANG_END -->",
  },
  quant: {
    start: "<!-- TABLE_QUANT_START -->",
    end: "<!-- TABLE_QUANT_END -->",
  },
  other: { start: "<!-- TABLE_START -->", end: "<!-- TABLE_END -->" },
} as const;
