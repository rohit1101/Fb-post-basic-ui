import { getTrendingGifs } from "../../services/api";

const InputField = ({
  title,
  query,
  setShowDropDown,
  setTrending,
  handleGifInp,
  inpVal,
  handleTextInp,
  placeholder,
}) => {
  return (
    <>
      {title === "gif" ? (
        <input
          style={{ width: "250px" }}
          type="text"
          value={query}
          placeholder={placeholder}
          onFocus={(e) => {
            setShowDropDown(true);
            getTrendingGifs().then((res) => setTrending(res.data));
          }}
          onChange={handleGifInp}
        />
      ) : (
        <input
          type="text"
          title={title}
          value={inpVal}
          placeholder={placeholder}
          onChange={handleTextInp}
        />
      )}
    </>
  );
};

export default InputField;
