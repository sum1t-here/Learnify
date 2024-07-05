import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description/", { state: { ...data } })}
      className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-[#F9C365]"
    >
      <div className="overflow-hidden">
        <img
          className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale-110 transition-transform duration-300"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
        <div className="p-3 space-y-1">
          <h2 className="text-xl font-bold text-[#333333] line-clamp-2">
            {data?.title}
          </h2>
          <p className="line-clamp-2 text-[#555555]">{data?.description}</p>
          <p className="font-semibold text-[#333333]">
            <span className="font-bold">Category: </span>
            {data?.category}
          </p>
          <p className="font-semibold text-[#333333]">
            <span className="font-bold">Total lectures: </span>
            {data?.numberOfLectures}
          </p>
          <p className="font-semibold text-[#333333]">
            <span className="font-bold">Instructor: </span>
            {data?.createdBy}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
