import React from "react";
import { GetSVG } from "../Network/ethereum";

import styles from "./Character.module.css";

function Character({ body, head, face, accessory, skinColor, clothesColor }) {
  return GetSVG(skinColor, body, head, face, accessory);
}

export default Character;
