export default function FilterStyled({ fill = "#FFFFFF", ...props }) {
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
            d="M9.09016 14.8929L10.9102 15.8019L10.9102 9.50887C10.9102 9.29387 10.9852 9.08487 11.1242 8.92187L17.1322 1.81787L2.86816 1.81787L8.87616 8.92187C9.01516 9.08487 9.09116 9.29387 9.09116 9.50887L9.09116 14.8929L9.09016 14.8929ZM11.8182 18.182C11.6792 18.182 11.5402 18.15 11.4122 18.086L7.77519 16.268C7.46719 16.114 7.27319 15.799 7.27319 15.455L7.27319 9.842L0.21519 1.495C-0.0138097 1.225 -0.0648098 0.847 0.0851903 0.526C0.23419 0.206 0.55519 0 0.90919 0L19.0912 0C19.4452 0 19.7662 0.205 19.9152 0.526C20.0652 0.847 20.0142 1.226 19.7852 1.496L12.7272 9.842L12.7272 17.272C12.7272 17.588 12.5642 17.88 12.2952 18.046C12.1502 18.136 11.9852 18.182 11.8182 18.182L11.8182 18.182Z"
            transform="translate(6 7)"
            id="qef2x2ea3b"
            fillRule="evenodd"
            stroke="none"
          />
        </g>
      </g>
    </svg>
  );
}
