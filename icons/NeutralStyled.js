export default function NeutralStyled() {
  return (
    <svg
      width="22px"
      height="8px"
      viewBox="0 0 22 8"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="filter_1">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0.65882355 0 0 0 0 0.65882355 0 0 0 0 0.65882355 0 0 0 1 0"
          />
        </filter>
      </defs>
      <g id="Group" filter="url(#filter_1)">
        <path
          d="M0 1C0 0.723858 0.0976311 0.488155 0.292893 0.292893C0.488155 0.0976311 0.723858 0 1 0L21 0C21.2761 0 21.5118 0.0976311 21.7071 0.292893C21.9024 0.488155 22 0.723858 22 1C22 1.27614 21.9024 1.51184 21.7071 1.70711C21.5118 1.90237 21.2761 2 21 2L1 2C0.723858 2 0.488155 1.90237 0.292893 1.70711C0.0976311 1.51184 0 1.27614 0 1L0 1Z"
          transform="translate(0 3)"
          id="Rectangle"
          fill="#000000"
          fillRule="evenodd"
          stroke="none"
        />
        <path
          d="M0 4C0 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4C8 6.20914 6.20914 8 4 8C1.79086 8 0 6.20914 0 4Z"
          transform="translate(7 0)"
          id="Circle"
          fill="#000000"
          fillRule="evenodd"
          stroke="none"
        />
      </g>
    </svg>
  );
}
