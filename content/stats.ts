export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export const heroStats: StatItem[] = [
  { value: 42, suffix: "%", label: "More qualified leads per month" },
  { value: 11, suffix: " days", label: "Average time to first automation live" },
  { value: 3.2, suffix: "x", label: "Faster response time to new leads" },
  { value: 98, suffix: "%", label: "Appointments confirmed without a human touch" },
];
