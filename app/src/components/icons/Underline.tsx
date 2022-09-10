const SvgComponent = ({ className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 67.164 22.347"
    width={134.328}
    height={44.694}
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
    <path fillOpacity="0" d="M0 0h67.164v22.347H0z" />
    <path
      d="M10.002 11.053c13.37-1.08 28.89-2.08 47.16 1.05m-46.38-1.84c16.96.15 33.08.43 45.2 2.08"
      stroke="#e29210"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
    />
  </svg>
)

export default SvgComponent
