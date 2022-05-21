import styled from "@emotion/styled";

function Spinner(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <g fill="none" fillRule="evenodd">
        <g strokeWidth="2">
          <g transform="translate(2 2)">
            <circle cx="22" cy="22" r="22" stroke="#B9B9B9" />
            <path stroke="#FF004C" d="M22 0C9.85 0 0 9.85 0 22" />
          </g>
        </g>
      </g>
    </svg>
  );
}

const AnimatedSpinner = styled(Spinner)`
  @keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }

  animation: 1.5s linear infinite spinner;
`;
export default AnimatedSpinner;
