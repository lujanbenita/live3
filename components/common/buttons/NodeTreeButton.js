export default function NodeTreeButton({ ...props }) {
  return (
    <button
      type="button"
      aria-label="Toggle tag selector modal"
      className="c-node-tree-button"
      {...props}
    >
      <svg
        pointerEvents="false"
        className="c-node-tree-button__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g fill="currentColor" fillRule="evenodd">
          <path
            opacity="0.5"
            fillRule="nonzero"
            d="M3.52631579,5.05263158 C3.83637039,5.05263158 4.09424215,5.27605283 4.14771915,5.57068341 L4.15789474,5.68421053 L4.15789474,8.84210526 L13,8.84210526 C13.3488114,8.84210526 13.6315789,9.12487279 13.6315789,9.47368421 C13.6315789,9.78373881 13.4081577,10.0416106 13.1135271,10.0950876 L13,10.1052632 L4.15789474,10.1052632 L4.15789474,15.1578947 L13,15.1578947 C13.3488114,15.1578947 13.6315789,15.4406623 13.6315789,15.7894737 C13.6315789,16.0995283 13.4081577,16.3574 13.1135271,16.410877 L13,16.4210526 L4.15789474,16.4210526 L4.15789474,21.4736842 L13,21.4736842 C13.3100546,21.4736842 13.5679264,21.6971055 13.6214034,21.991736 L13.6315789,22.1052632 C13.6315789,22.4153178 13.4081577,22.6731895 13.1135271,22.7266665 L13,22.7368421 L3.52631579,22.7368421 C3.21626119,22.7368421 2.95838943,22.5134208 2.90491242,22.2187903 L2.89473684,22.1052632 L2.89473684,5.68421053 C2.89473684,5.33539911 3.17750437,5.05263158 3.52631579,5.05263158 Z"
          />
          <rect
            width="7.579"
            height="3.789"
            x="14.895"
            y="7.579"
            fillRule="nonzero"
            rx="1.5"
          />
          <rect
            width="10.105"
            height="3.789"
            x="1"
            fillRule="nonzero"
            rx="1.5"
          />
          <rect
            width="7.579"
            height="3.789"
            x="14.895"
            y="13.895"
            fillRule="nonzero"
            rx="1.5"
          />
          <rect
            width="7.579"
            height="3.789"
            x="14.895"
            y="20.211"
            fillRule="nonzero"
            rx="1.5"
          />
        </g>
      </svg>
    </button>
  );
}
