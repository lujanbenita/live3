import Head from "next/head";

const HeadComponent = ({ title }) => (
  <Head>
    <title>{`${title} | alva Live`}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
);

export default HeadComponent;
