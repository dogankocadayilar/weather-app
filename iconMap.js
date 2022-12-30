export const ICON_MAP = new Map();

setMultIcons([0, 1], "sun");
setMultIcons([2], "cloud-sun");
setMultIcons([3], "cloud");
setMultIcons([45, 48], "smog");
setMultIcons([51, 53, 55, 56, 57, 61, 63, 65, 66, 67], "rain");
setMultIcons([71, 73, 75, 77, 80, 81, 82, 85, 86], "snow");
setMultIcons([95, 96, 99], "cloud-bolt");

function setMultIcons(iconCodes, icon) {
  iconCodes.forEach((iconCode) => {
    ICON_MAP.set(iconCode, icon);
  });
}
