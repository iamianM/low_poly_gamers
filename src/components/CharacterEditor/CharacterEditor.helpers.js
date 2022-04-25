import {
  numHeads,
  numHairStyles,
  numBeardStyles,
  skinColors,
  hairColors,
} from "../../constants";
import { zeroPadNumber, range } from "../../utils";

export const headOptions = range(numHeads).map((index) => {
  return {
    id: index,
    label: `Head ${index + 1}`,
    children: zeroPadNumber(index + 1),
  };
});
export const hairStyleOptions = range(numHairStyles).map((index) => {
  return {
    id: index,
    label: `Accessory ${index + 1}`,
    children: zeroPadNumber(index + 1),
  };
});
export const beardStyleOptions = range(numBeardStyles).map((index) => {
  return {
    id: index,
    label: `Accessory ${index + 1}`,
    children: zeroPadNumber(index + 1),
  };
});
export const skinColorOptions = skinColors.map(({ label, color }) => {
  return {
    id: color,
    label,
    color,
    children: null,
  };
});
export const hairColorOptions = hairColors.map(({ label, color }) => {
  return {
    id: color,
    label,
    color,
    children: null,
  };
});
