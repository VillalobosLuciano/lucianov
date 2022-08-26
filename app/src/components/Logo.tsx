interface LogoProps {
  className?: string
}

export function Logo(props: LogoProps) {
  return (
    <svg
      width={40}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          d="M13.378 23.757H-4.128L.413.967h4.932L1.512 20.065h12.623l-.757 3.692ZM39.431.967l-12.868 22.79H20.9L17.114.967h5.079l1.904 14.649c.065.473.114.97.147 1.49.048.506.09.963.122 1.373.049.505.081.986.097 1.444.212-.442.424-.907.635-1.396.195-.41.415-.876.66-1.397l.78-1.514L34.304.966h5.128Z"
          fill="url(#b)"
        />
      </g>
      <g clipPath="url(#c)">
        <path
          d="M19.072 23.757H1.566L6.107.967h4.932L7.206 20.065h12.623l-.757 3.692ZM45.125.967l-12.868 22.79h-5.664L22.808.967h5.079l1.904 14.649c.065.473.114.97.147 1.49.049.506.09.963.122 1.373.049.505.081.986.097 1.444.212-.442.424-.907.635-1.396.195-.41.415-.876.66-1.397l.78-1.514L39.998.966h5.128Z"
          fill="url(#d)"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1={-4.763}
          y1={1.093}
          x2={34.265}
          y2={19.869}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F59E0B" />
          <stop offset={1} stopColor="#B45309" />
        </linearGradient>
        <linearGradient
          id="d"
          x1={0.931}
          y1={1.093}
          x2={39.959}
          y2={19.869}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F59E0B" />
          <stop offset={1} stopColor="#B45309" />
        </linearGradient>
        <clipPath id="a">
          <path
            fill="#fff"
            transform="translate(15.516 .967)"
            d="M0 0h23.915v22.79H0z"
          />
        </clipPath>
        <clipPath id="c">
          <path
            fill="#fff"
            transform="translate(1.566 .967)"
            d="M0 0h18.79v22.79H0z"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
