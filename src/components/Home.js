import { useState, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "../FirebaseCreds";
import { Link } from "react-router-dom";
import { getCharacters } from "../api/CharacterAPI";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase();

function Home({ globalVals, setGlobalVals }) {
  const navigate = useNavigate();
  const [characterName, setCharacterName] = useState("");
  const { state, logIn } = useContext(AuthContext);

  const loadCharacter = async (e) => {
    e.preventDefault();
    console.log(characterName);
    document.title =
      characterName.charAt(0).toUpperCase() +
      characterName.slice(1) +
      "'s Character Sheet - Battle Team";
    // const citiesCol = collection(db, "characters");
    // const citySnapshot = await getDocs(citiesCol);
    // const cityList = citySnapshot.docs.map((doc) => doc.data());
    // console.log(cityList);
    const characterList = getCharacters();
    const characterID = "";
    for (let character in Object.keys(characterList)) {
      console.log(character);
      if (
        characterName.toLowerCase() === characterList[character].toLowerCase()
      ) {
        characterID = character;
      }
    }
    console.log(characterID);
    navigate("/character/" + characterID);
    // const characterRef = ref(db, "characters/" + characterID);
    // onValue(characterRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data);
    //   // setCharacter(data);
    // });
  };
  const characterSelectChanged = (e) => {
    setCharacterName(e.target.value);
  };

  const enterAdmin = (e) => {
    e.preventDefault();
    var pass = prompt(
      "Enter the correct password or you shall be sacrificed to our Dragon Cave..."
    );
    if (pass === "BT1vsSoop") {
      // setInAdmin(true);
      alert("You have entered Admin Mode!!!");
    } else {
      alert("INCORRECT!!! SACRAFICE THEM TO THE DRAGONS!!!");
    }
  };

  useEffect(() => {
    document.title = "Battle Team";
  });

  const createCharacter = () => {};
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div style={{ flexDirection: "column", display: "none" }}>
        <form>
          <label>Character </label>
          <input
            type="text"
            onChange={characterSelectChanged}
            value={characterName}
          ></input>
          {/* <button type="submit" onClick={loadCharacter}>
            GO
          </button> */}
          {/* <Link to={"/character/" + characterName}> */}
          <button onClick={loadCharacter}>GO</button>
          {/* </Link> */}
        </form>
        <Link to={"/create/character/"}>
          <button onClick={createCharacter}>Create New Character</button>
        </Link>
        <button onClick={enterAdmin}>enter admin mode</button>
      </div>
      {state.loggedIn ? (
        <div style={{ marginRight: 50 }}>
          <ul>
            <li>
              {state.username === "Turbo" ? null : (
                <Link to="/list/characters">
                  <p>View my characters</p>
                </Link>
              )}
            </li>
            <li>
              <Link to="/create/character">
                <p>Create a character</p>
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div style={{ width: "25vw" }}>
          <h2 style={{ fontWeight: "normal" }}>
            Welcome To The Offical <b>Battle Team</b> Website!
          </h2>
          <h4 style={{ fontWeight: "normal" }}>
            <Link to="/signup">Create A Free Account</Link> To Access Our
            Character Sheets, Rulebooks, And More!
          </h4>
        </div>
      )}
      <div style={{ flexDirection: "column", borderStyle: "dashed" }}>
        <h3>COMING SOON!!!</h3>
        <img
          style={{ height: "70vh" }}
          alt="Twev's Tome of Arcane Knowledge and War Tactics"
          src={require("../images/TToAKaWTcover.png")}
        />
        <h3>Preorder(not) available now!</h3>
      </div>
    </div>
  );
}
export default Home;
