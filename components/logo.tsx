import * as React from 'react';
export const Logo = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M25.556 11.685A10 10 0 0 0 20 10V0A20 20 0 1 1 0 20h10a10 10 0 1 0 15.556-8.315Z"
      className="ccustom"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      fillRule="evenodd"
      d="M10 0A10 10 0 0 1 0 10v10A20 20 0 0 0 20 0H10Z"
      className="ccustom"
      clipRule="evenodd"
    />
  </svg>
);
