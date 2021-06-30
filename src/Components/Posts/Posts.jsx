const Posts = ({ index, item, handleStatusDelete }) => {
  return (
    <div key={index} className="card">
      <button
        onClick={() => handleStatusDelete(index)}
        style={{ float: "right" }}
      >
        X
      </button>
      <h2>{item.text}</h2>

      {item.sources.map((images, index) => (
        <img key={index} src={images} alt={images} />
      ))}
    </div>
  );
};

export default Posts;
