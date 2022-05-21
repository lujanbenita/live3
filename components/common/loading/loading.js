import Image from "next/image";

const logoLoader = ({ src, width, quality }) =>
  `${src}?w=${width}&q=${quality || 75}`;

const Loading = () => (
  <div className="c-loading">
    <Image
      loader={logoLoader}
      className="c-loading__img"
      alt="alva Loading"
      width="60"
      height="54"
      src={`${process.env.PUBLIC_URL}/img/loader.gif`}
    />
    <div className="c-loading__text">
      Please wait while we are processing your request…
    </div>
  </div>
);

export default Loading;
