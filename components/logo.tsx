import * as React from 'react';
export const Logo = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M20.445 9.348A8 8 0 0 0 16 8V0A16 16 0 1 1 0 16h8a8 8 0 1 0 12.445-6.652Z"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      fillRule="evenodd"
      d="M8 0a8 8 0 0 1-8 8v8A16 16 0 0 0 16 0H8Z"
      clipRule="evenodd"
    />
  </svg>
);
