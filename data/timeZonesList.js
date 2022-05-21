import { listTimeZones, findTimeZone, getUTCOffset } from "timezone-support";

const timeZones = listTimeZones();

const zonesFilter = [
  "Etc/UTC",
  "Africa",
  "America",
  "Antarctica",
  "Asia",
  "Australia",
  "Europe",
  "Indian",
  "Pacific",
];

const timeZonesList = timeZones
  .filter((item) => zonesFilter.some((zone) => item.startsWith(zone)))
  .map((timeZone) => {
    const date = new Date();
    const currentTimezone = findTimeZone(timeZone);
    const UTCOffset = getUTCOffset(date, currentTimezone).offset / 60;
    const sign = UTCOffset >= 0 ? "-" : "+";
    const GMT = `GMT ${sign} ${Math.abs(UTCOffset)}`;
    return {
      timeZone,
      UTCOffset,
      format: `${timeZone} (${GMT})`,
    };
  })
  .sort((a, b) => b.UTCOffset - a.UTCOffset)
  .map((timeZoneObject) => ({
    label: timeZoneObject.format,
    value: timeZoneObject.timeZone,
  }));

export default timeZonesList;
