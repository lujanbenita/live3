const formatCountries = (countries) =>
  countries
    .filter(({ isoCode }) => isoCode !== "WW")
    .map(({ country }) => ({
      typeName: "country",
      value: country,
    }));

export default formatCountries;
