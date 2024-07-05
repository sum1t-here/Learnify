import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import { useEffect } from "react";
import CourseCard from "../../components/CouseCard";

function CourseList() {
  const dispatch = useDispatch();
  const { courseData, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    const loadCourses = async () => {
      await dispatch(getAllCourses());
    };
    loadCourses();
  }, []);

  return (
    <div className="min-h-[90vh] pt-12 px-4 md:px-12 flex flex-col gap-10 text-[#333333]  bg-gray-100 font-outfit">
      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-5">
        Explore the courses made by
        <span className="font-bold text-yellow-500"> Industry experts</span>
      </h1>
      {loading && <p className="text-center text-black">Loading courses...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="mb-10 flex flex-wrap gap-6 md:gap-14 justify-center">
        {courseData?.map((element) => (
          <CourseCard key={element._id} data={element} />
        ))}
      </div>
    </div>
  );
}

export default CourseList;
