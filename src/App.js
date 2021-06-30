import { useEffect, useState } from "react";
import { getGifs, getTrendingGifs } from "./services/api";
import "./App.css";
import Label from "./Components/Label/Label";
import DropDownContent from "./Components/DropdownContent/DropdownContent";
import Posts from "./Components/Posts/Posts";

export default function App() {
  const [inpVal, setInpVal] = useState("");
  const [query, setQuery] = useState("");
  const [gifBtn, setGifBtn] = useState(false);
  const [trending, setTrending] = useState([]);
  const [posts, setPosts] = useState([]);
  const [img, setImg] = useState([]);
  const [status, setStatus] = useState([]);
  const [isPreview, setIsPreview] = useState(true);
  // const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const onMount = JSON.parse(localStorage.getItem("fbPosts")) || [];
    setStatus(onMount);
  }, []);

  const handleTextInp = async (e) => {
    setInpVal(e.target.value);
  };

  const handleGifInp = (e) => {
    setQuery(e.target.value);
    getGifs(query).then((res) => setPosts(res.data));
    if (!e.target.value.length) {
      setQuery("");
      setPosts([]);
    }
  };

  const handleAddStatus = () => {
    const message = {
      sources: img,
      text: inpVal,
    };
    setStatus([message, ...status]);
    localStorage.setItem("fbPosts", JSON.stringify([message, ...status]));
    console.log(message);
    setShowDropDown(false);
    setGifBtn(false);
    setImg([]);
    setQuery("");
    setInpVal("");
  };

  const handleStatusDelete = (index) => {
    const updatedStatus = [...status].filter((item, ind) => ind !== index);
    setStatus(updatedStatus);
    localStorage.setItem("fbPosts", JSON.stringify(updatedStatus));
  };

  return (
    <div className="App">
      <h1>Create a new Post</h1>

      <Label title="Add a new post" />
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
          <Label title="Add a gif for a final touch!" />
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
                  setQuery("");
                }}
                style={{ float: "right" }}
              >
                x
              </button>
              <div className="dropdownContent">
                {query.length > 0
                  ? posts.map((post) => {
                      return (
                        <DropDownContent
                          type="post"
                          post={post}
                          img={img}
                          setImg={setImg}
                          key={post.id}
                        />
                      );
                    })
                  : trending.map((trend) => {
                      return <DropDownContent post={trend} key={trend.id} />;
                    })}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <button
        disabled={Boolean(inpVal.length) ? false : true}
        style={{ display: "block", padding: "0 1rem", margin: "1rem 0" }}
        onClick={handleAddStatus}
      >
        Add Post
      </button>

      <h1>My Posts</h1>
      {Boolean(status.length) ? (
        <div>
          {status.map((item, index) => (
            <Posts
              item={item}
              index={index}
              handleStatusDelete={handleStatusDelete}
            />
          ))}
        </div>
      ) : (
        "No Posts!"
      )}
    </div>
  );
}
