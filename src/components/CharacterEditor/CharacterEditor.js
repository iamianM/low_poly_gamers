import React from "react";

import { defaultSkinColor, defaultClothesColor } from "../../constants";
import Character from "../Character";
import MaxWidthWrapper from "../MaxWidthWrapper";
import ControlPane from "../ControlPane";

import styles from "./CharacterEditor.module.css";
import { skinColors, clothesColors } from "../../constants";
import { zeroPadNumber, range } from "../../utils";

import {
  BodyCount,
  HeadCount,
  FaceCount,
  AccessoryCount,
} from "../Network/ethereum";

function App() {
  const [body, setBody] = React.useState(0);
  const [head, setHead] = React.useState(0);
  const [face, setFace] = React.useState(0);
  const [accessory, setAccessory] = React.useState(0);
  const [skinColor, setSkinColor] = React.useState(defaultSkinColor);
  const [clothesColor, setClothesColor] = React.useState(defaultClothesColor);

  // const [numBodies, numHeads, numFaces, numAccessories] = GetCounts();
  const _bodyCount = BodyCount();
  const _headCount = HeadCount();
  const _faceCount = FaceCount();
  const _accessoryCount = AccessoryCount();

  // const __bodyCount = Promise.resolve(_bodyCount);
  // const __headCount = Promise.resolve(_headCount);
  // const __faceCount = Promise.resolve(_faceCount);
  // const __accessoryCount = Promise.resolve(_accessoryCount);

  const bodyCount = _bodyCount.then(function (a) {
    return a;
  });
  const headCount = _headCount.then(function (a) {
    return a;
  });
  const faceCount = _faceCount.then(function (a) {
    return a;
  });
  const accessoryCount = _accessoryCount.then(function (a) {
    return a;
  });

  if (bodyCount != "2") {
    console.log("nothing", bodyCount);
    return "";
  }
  console.log(accessoryCount);

  const bodyOptions = range(parseInt(bodyCount)).map((index) => {
    return {
      id: index,
      label: `Body ${index + 1}`,
      children: zeroPadNumber(index + 1),
    };
  });
  const headOptions = range(parseInt(headCount)).map((index) => {
    return {
      id: index,
      label: `Head ${index + 1}`,
      children: zeroPadNumber(index + 1),
    };
  });
  const faceOptions = range(parseInt(faceCount)).map((index) => {
    return {
      id: index,
      label: `Face ${index + 1}`,
      children: zeroPadNumber(index + 1),
    };
  });
  const accessoryOptions = range(parseInt(accessoryCount)).map((index) => {
    return {
      id: index,
      label: `Accessory ${index + 1}`,
      children: zeroPadNumber(index + 1),
    };
  });
  const skinColorOptions = skinColors.map(({ label, color }) => {
    return {
      id: color,
      label,
      color,
      children: null,
    };
  });
  const clothesColorOptions = clothesColors.map(({ label, color }) => {
    return {
      id: color,
      label,
      color,
      children: null,
    };
  });

  return (
    <main className={styles.characterEditor}>
      <div className={styles.perspectiveEffect}></div>
      <MaxWidthWrapper className={styles.maxWidthWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Create your Character</h1>
          <p className={styles.description}>
            Customize your character's look and style using the controls below.
            What sort of adventure will you embark on?{" "}
          </p>
        </header>
        <div className={styles.controlColumn}>
          <ControlPane
            title="Bodies"
            options={bodyOptions}
            currentOption={body}
            handleSelectOption={setBody}
          />
          <ControlPane
            title="Heads"
            options={headOptions}
            currentOption={head}
            handleSelectOption={setHead}
          />
          <ControlPane
            title="Faces"
            options={faceOptions}
            currentOption={face}
            handleSelectOption={setFace}
          />
          <ControlPane
            title="Accessories"
            options={accessoryOptions}
            currentOption={accessory}
            handleSelectOption={setAccessory}
          />
          <ControlPane
            title="Skin Color"
            options={skinColorOptions}
            currentOption={skinColor}
            handleSelectOption={setSkinColor}
          />
          <ControlPane
            title="Clothing Color"
            options={clothesColorOptions}
            currentOption={clothesColor}
            handleSelectOption={setClothesColor}
          />
        </div>
      </MaxWidthWrapper>

      <div className={styles.characterWrapper}>
        <Character
          body={body}
          head={head}
          face={face}
          accessory={accessory}
          skinColor={skinColor}
          clothesColor={clothesColor}
        />
      </div>
    </main>
  );
}

export default App;
