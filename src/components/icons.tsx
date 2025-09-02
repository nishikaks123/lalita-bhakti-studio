import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2c3.5 0 6.5 2.5 7 6-1.5 2-4.5 2-7 2s-5.5 0-7-2c.5-3.5 3.5-6 7-6z" />
      <path d="M12 14c-3.5 0-6.5-2.5-7-6 1.5-2 4.5-2 7-2s5.5 0 7 2c-.5 3.5-3.5 6-7 6z" />
      <path d="M4 14c-1.5 2-1.5 5.5 0 7.5 2 .5 4.5 0 6-1.5" />
      <path d="M20 14c1.5 2 1.5 5.5 0 7.5-2 .5-4.5 0-6-1.5" />
      <path d="M12 22c-2 0-3.5-1.5-3.5-3.5" />
      <path d="M12 22c2 0 3.5-1.5 3.5-3.5" />
    </svg>
  );
}
