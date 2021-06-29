import logo from './logo.svg';
import './App.css';


import { useState } from "react";
import "./styles.css";

export default function App() {
  const [inpVal, setInpVal] = useState();
  const [query, setQuery] = useState();
  const [gifBtn, setGifBtn] = useState(false);
  const [posts, setPosts] = useState([]);

  const baseURL = `https://api.giphy.com/v1/gifs/search?`;
  const apiKey = `api_key=zPVSPYksxDsaKTixDPuXVRQ01Wn0HCLZ`;

  const handleTextInp = (e) => {
    setInpVal(e.target.value);
  };

  const handleGifInp = async (e) => {
    setQuery(e.target.value);

    const results = await fetch(
      `${baseURL}${apiKey}&q=${query}&limit=5&offset=0&rating=g&lang=en`
    );
    const gifs = await results.json();
    console.log(gifs);
  };

  return (
    <div className="App">
      <h1>Create a new Post</h1>
      <label style={{ display: "block", padding: "1rem 0" }}>
        Add a new post
      </label>
      <input
        type="text"
        value={inpVal}
        placeholder="What's on your mind ?"
        onChange={handleTextInp}
      />
      <button
        style={{ display: "block", padding: "0 1rem", margin: "1rem 0" }}
        onClick={() => setGifBtn(true)}
      >
        GIFS
      </button>
      {gifBtn ? (
        <>
          <label style={{ display: "block", padding: "1rem 0" }}>
            Add a gif for a final touch!
          </label>
          <input
            type="text"
            value={query}
            placeholder="Search gifs"
            onChange={handleGifInp}
          />
          <button
            style={{ display: "block", padding: "0 1rem", margin: "1rem 0" }}
            onClick={() => setGifBtn(false)}
          >
            Cancel
          </button>
          <button
            style={{ display: "block", padding: "0 1rem" }}
            onClick={() => {
              setGifBtn(false);
              setQuery("");
            }}
          >
            Add GIF
          </button>
        </>
      ) : null}
      <button
        disabled={Boolean(inpVal.length) ? false : true}
        style={{ display: "block", padding: "0 1rem", margin: "1rem 0" }}
        onClick={() => setInpVal("")}
      >
        Add Post
      </button>
    </div>
  );
}
