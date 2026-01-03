import * as React from "react"

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="120"
      height="30"
      {...props}
    >
      <g transform="translate(0 -5)">
        <path
          d="M40 2C26.5 2 15.4 10.5 13.9 21.6L14 22C14.1 27.5 16.5 32.5 20.7 36.1C25.5 40.1 32 42.1 38.3 42.1C38.9 42.1 39.5 42.1 40 42C40.5 42.1 41.1 42.1 41.7 42.1C48 42.1 54.5 40.1 59.3 36.1C63.5 32.5 65.9 27.5 66 22L66.1 21.6C64.6 10.5 53.5 2 40 2Z"
          fill="#007BFF"
        />
        <path
          d="M40.3 2C27.8 2 17.5 9.8 14.2 20.1L14 21.7C14.1 27.2 16.5 32.2 20.7 35.8C25.5 39.8 32 41.8 38.3 41.8C38.9 41.8 39.5 41.8 40 41.7V2Z"
          fill="#28A745"
        />
      </g>

      <text
        x="75"
        y="25"
        fontFamily="Poppins, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="#FFA500"
      >
        Viva
      </text>
      <text
        x="75"
        y="50"
        fontFamily="Poppins, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="#007BFF"
      >
        Fit
      </text>
    </svg>
  )
}
