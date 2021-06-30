import { useState } from "react";
import { getTrendingGifs } from "./services/api";
import "./App.css";
import { apiKey, baseURL } from "./constants";
import Label from "./Components/Label/Label";

export default function App() {
  const [inpVal, setInpVal] = useState("");
  const [query, setQuery] = useState();
  const [gifBtn, setGifBtn] = useState(false);
  const [trending, setTrending] = useState([]);
  // const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
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

      <Label value="Add a new post" />
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
          <Label value="Add a gif for a final touch!" />
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
              <div className="dropdownContent">
                {trending.map((trend) => {
                  return (
                    <div key={trend.id} className="trendImg">
                      <img
                        className="trendImg"
                        // style={{ width: "220px", height: "120px" }}
                        src={trend.images.fixed_width_downsampled.url}
                        alt={trend.id}
                      />
                    </div>
                  );
                })}
              </div>
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
