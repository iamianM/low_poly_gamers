import React from "react";

import { defaultSkinColor, defaultHairColor } from "../../constants";
import Character from "../Character";
import MaxWidthWrapper from "../MaxWidthWrapper";
import ControlPane from "../ControlPane";

import {
  headOptions,
  hairStyleOptions,
  beardStyleOptions,
  skinColorOptions,
  hairColorOptions,
} from "./CharacterEditor.helpers";
import styles from "./CharacterEditor.module.css";

function App() {
  const [head, setHead] = React.useState(0);
  const [hairStyle, setHairStyle] = React.useState(0);
  const [beardStyle, setBeardStyle] = React.useState(0);
  const [skinColor, setSkinColor] = React.useState(defaultSkinColor);
  const [hairColor, setHairColor] = React.useState(defaultHairColor);
  console.log(skinColor);

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
            title="Heads"
            options={headOptions}
            currentOption={head}
            handleSelectOption={setHead}
          />
          <ControlPane
            title="HairStyles"
            options={hairStyleOptions}
            currentOption={hairStyle}
            handleSelectOption={setHairStyle}
          />
          <ControlPane
            title="BeardStyles"
            options={beardStyleOptions}
            currentOption={beardStyle}
            handleSelectOption={setBeardStyle}
          />
          <ControlPane
            title="Skin Color"
            options={skinColorOptions}
            currentOption={skinColor}
            handleSelectOption={setSkinColor}
          />
          <ControlPane
            title="Hair Color"
            options={hairColorOptions}
            currentOption={hairColor}
            handleSelectOption={setHairColor}
          />
        </div>
      </MaxWidthWrapper>

      <div className={styles.characterWrapper}>
        <Character
          head={head}
          hairStyle={hairStyle}
          beardStyle={beardStyle}
          skinColor={skinColor}
          hairColor={hairColor}
        />
      </div>
    </main>
  );
}

export default App;
