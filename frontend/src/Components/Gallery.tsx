import CardsGallery from "./CardsGallery";

type imgArr = {
  imgArr: { imgUrl: string; imgId: string; imgName: string }[];
  handleClick: (id: string) => void;
  deleteSession: (id: string) => void;
};

const Gallery = ({ imgArr, handleClick, deleteSession }: imgArr) => {
  return (
    <div
      className="min-h-full w-full flex flex-col overflow-y-auto"
      style={{ background: "#222226" }}
    >
      <div className="px-8 py-6" style={{ borderBottom: "1px solid #303036" }}>
        <h1
          className="text-xl font-semibold"
          style={{ color: "#d0d0d0", letterSpacing: "0.02em" }}
        >
          Dashboard
        </h1>
      </div>
      <div className="p-8 w-full flex gap-6 flex-wrap">
        {imgArr.map(
          (
            img: { imgUrl: string; imgId: string; imgName: string },
            index: number,
          ) =>
            img.imgUrl && (
              <CardsGallery
                key={"card" + index}
                previewImage={img.imgUrl}
                name={img.imgName}
                deleteSession={() => {
                  deleteSession(img.imgId);
                }}
                onClick={() => handleClick(img.imgId)}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default Gallery;
