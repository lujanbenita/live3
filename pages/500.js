import Error from "./_error";

export default function Custom500() {
  return <Error error={500} />;
}
