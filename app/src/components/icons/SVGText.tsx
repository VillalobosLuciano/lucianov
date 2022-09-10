const SVGText = ({ className = '', text = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 159 45"
    width={318}
    height={90}
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
    <path fillOpacity="0" d="M0 0h159v45H0z" />
    <text
      y={18}
      fontFamily="Virgil, Segoe UI Emoji"
      fontSize={20}
      fill="#e29210"
      style={{
        whiteSpace: 'pre',
      }}
      transform="translate(10 10)"
    >
      {text}
    </text>
  </svg>
)

export default SVGText
