import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../Redux/Slices/CourseSlice";
import CourseCard from "./CouseCard";

function PopularCourses() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCourses = async () => {
      await dispatch(getAllCourses());
    };
    loadCourses();
  }, []);

  const { courseData } = useSelector((state) => state.course);
  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center gap-4 p-5">
      <div className="text-white text-3xl lg:text-7xl flex flex-row gap-1 items-center font-outfit lg:mb-32">
        Popular
        <div className="border border-[#F9C365] rounded-full p-2 ">
          <span className="font-petit text-[#F9C365]">Courses</span>
        </div>
      </div>
      <div className="mb-10 flex flex-wrap gap-6 md:gap-14 justify-center">
        {courseData?.map((element) => (
          <CourseCard key={element._id} data={element} />
        ))}
      </div>
    </div>
  );
}

export default PopularCourses;
