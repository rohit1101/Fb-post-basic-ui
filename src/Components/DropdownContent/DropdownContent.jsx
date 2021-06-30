const DropDownContent = ({ post, img, setImg, type }) => {
  return (
    <>
      {type === "post" ? (
        <div className="trendImg">
          <img
            className="trendImg"
            src={post.images.fixed_width_downsampled.url}
            alt={post.id}
            onClick={() => {
              let selectedImg = [...img];
              selectedImg.push(post.images.fixed_width_downsampled.url);

              setImg(selectedImg);
            }}
          />
        </div>
      ) : (
        <div key={post.id} className="trendImg">
          <img
            className="trendImg"
            src={post.images.fixed_width_downsampled.url}
            alt={post.id}
            style={{ cursor: "not-allowed" }}
          />
        </div>
      )}
    </>
  );
};

export default DropDownContent;
