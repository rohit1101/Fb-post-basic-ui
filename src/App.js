import { useState } from "react";
import { getTrendingGifs } from "./apis/getTrendingGifs";
import "./App.css";
import { apiKey, baseURL } from "./constants";

export default function App() {
  const [inpVal, setInpVal] = useState("");
  const [query, setQuery] = useState();
  const [gifBtn, setGifBtn] = useState(false);
  const [trending, setTrending] = useState([]);
  // const [posts, setPosts] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);

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
        <div className="App">
          <label style={{ display: "block", padding: "1rem 0" }}>
            Add a gif for a final touch!
          </label>
          <input
            style={{ width: "250px" }}
            type="text"
            value={query}
            placeholder="Search gifs"
            onFocus={(e) => {
              setShowDropDown(true);
              getTrendingGifs().then((res) => setTrending(res.data));
            }}
            onChange={handleGifInp}
          />
          {showDropDown ? (
            <div className="dropdown">
              <button
                onClick={() => {
                  setGifBtn(false);
                  setShowDropDown(false);
                }}
                style={{ float: "right" }}
              >
                x
              </button>
              <div></div>
            </div>
          ) : null}
        </div>
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
