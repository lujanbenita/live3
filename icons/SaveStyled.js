export default function SaveStyled({ fill = "#FFFFFF", ...props }) {
  return (
    <svg
      {...props}
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
    >
      <defs>
        <path d="M0 0L32 0L32 32L0 32L0 0Z" id="path_1" />
        <clipPath id="mask_1">
          <use xlinkHref="#path_1" />
        </clipPath>
      </defs>
      <g id="Group-8">
        <path
          d="M0 0L32 0L32 32L0 32L0 0Z"
          id="Background"
          fill="none"
          fillRule="evenodd"
          stroke="none"
        />
        <g clipPath="url(#mask_1)">
          <path
            d="M14 0C14.265 0 14.52 0.105 14.707 0.293L19.707 5.293C19.895 5.48 20 5.735 20 6L20 17C20 18.657 18.657 20 17 20L3 20C1.343 20 0 18.657 0 17L0 3C0 1.343 1.343 0 3 0L14 0ZM13.585 2L6 2L6 5L13 5C13.513 5 13.936 5.386 13.993 5.883L14 6C14 6.513 13.614 6.936 13.117 6.993L13 7L5 7C4.487 7 4.064 6.614 4.007 6.117L4 6L4 2L3 2C2.487 2 2.064 2.386 2.007 2.883L2 3L2 17C2 17.552 2.448 18 3 18L4 18L4 11C4 10.487 4.386 10.064 4.883 10.007L5 10L15 10C15.513 10 15.936 10.386 15.993 10.883L16 11L16 18L17 18C17.513 18 17.936 17.614 17.993 17.117L18 17L18 6.415L13.585 2L13.585 2ZM14 12L6 12L6 18L14 18L14 12L14 12Z"
            transform="translate(6 6)"
            id="fcwmnwgvmb"
            fillRule="evenodd"
            stroke="none"
          />
        </g>
      </g>
    </svg>
  );
}
