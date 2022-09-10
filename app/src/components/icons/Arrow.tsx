const Arrow = ({ className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 61.132 21.618"
    width={122.265}
    height={43.237}
    className={className}
    {...props}
  >
    <defs>
      <style>
        {
          '@font-face{font-family:"Virgil";src:url(https://excalidraw.com/Virgil.woff2)}@font-face{font-family:"Cascadia";src:url(https://excalidraw.com/Cascadia.woff2)}'
        }
      </style>
    </defs>
    <path fillOpacity="0" d="M0 0h61.132v21.618H0z" />
    <g strokeLinecap="round">
      <path
        d="M9.998 11.486c15.51-1.59 31.04-1.64 41.13-1.34m-39.75 1.47c9.98-.48 22.94-1.42 38.47-.37"
        stroke="#e29210"
        strokeWidth={2}
        fill="none"
      />
      <path
        d="M30.618 17.706c7.31-3.8 14.61-6.11 20.42-6.99m-19.05 7.12c3.87-2.21 10.63-4.84 17.78-6.03"
        stroke="#e29210"
        strokeWidth={2}
        fill="none"
      />
      <path
        d="M31.108 4.216c7 1.57 14.1 4.64 19.93 6.5m-18.57-6.38c3.59 1.82 10.21 3.23 17.3 7.47"
        stroke="#e29210"
        strokeWidth={2}
        fill="none"
      />
    </g>
  </svg>
)

export default Arrow
