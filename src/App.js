import { useEffect, useMemo, useState } from "react";
import { getGifs } from "./services/api";
import "./App.css";
import Label from "./Components/Label/Label";
import DropDownContent from "./Components/DropdownContent/DropdownContent";
import Posts from "./Components/Posts/Posts";
import InputField from "./Components/Input/InputField";

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default function App() {
  const [inpVal, setInpVal] = useState("");
  const [query, setQuery] = useState("");
  const [gifBtn, setGifBtn] = useState(false);
  const [trending, setTrending] = useState([]);
  const [posts, setPosts] = useState([]);
  const [img, setImg] = useState([]);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const onMount = JSON.parse(localStorage.getItem("fbPosts")) || [];
    setStatus(onMount);
  }, []);

  const handleTextInp = (e) => {
    setInpVal(e.target.value);
  };

  const handleAddStatus = () => {
    const message = {
      sources: img,
      text: inpVal,
    };
    setStatus([message, ...status]);
    localStorage.setItem("fbPosts", JSON.stringify([message, ...status]));

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

  const makeNetworkCall = (queryText) => {
    if (!queryText) {
      setPosts([]);
      return;
    }
    getGifs(queryText)
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handler = (e) => {
    const { value } = e.target;
    setQuery(value);
    debouncedFn(value);
  };

  const debouncedFn = useMemo(() => debounce(makeNetworkCall, 1000), []);

  return (
    <div className="App">
      <h1>Create a new Post</h1>

      <Label title="Add a new post" />

      <InputField
        inpVal={inpVal}
        placeholder="What's on your mind ?"
        title="post"
        handleTextInp={handleTextInp}
      />

      <button
        style={{ display: "block", padding: "0 1rem", margin: "1rem 0" }}
        onClick={() => setGifBtn(true)}
      >
        Add Gifs
      </button>

      {gifBtn ? (
        <div className="App">
          <button
            style={{ display: "block", padding: "0 1rem", margin: "1rem 0" }}
            onClick={() => {
              setGifBtn(false);
              setQuery("");
            }}
          >
            Cancel
          </button>
          <Label title="Add a gif for a final touch!" />

          <InputField
            title="gif"
            query={query}
            placeholder="Search gifs"
            setShowDropDown={setShowDropDown}
            handleGifInp={handler}
            setTrending={setTrending}
          />
          {showDropDown ? (
            <div className="dropdown">
              <button
                onClick={() => {
                  // setGifBtn(false);
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
                          loading={loading}
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
              key={index}
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
