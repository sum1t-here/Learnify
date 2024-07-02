function PopularCourses() {
  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center gap-4 p-5">
      <div className="text-white text-3xl lg:text-7xl flex flex-row gap-1 items-center font-outfit lg:mb-32">
        Popular
        <div className="border border-[#F9C365] rounded-full p-2 ">
          <span className="font-petit text-[#F9C365]">Courses</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 lg:flex-row">
        <div className="bg-[#D9D9D9] h-72 w-60 rounded-lg"></div>
        <div className="bg-[#D9D9D9] h-72 w-60 rounded-lg"></div>
        <div className="bg-[#D9D9D9] h-72 w-60 rounded-lg"></div>
      </div>
    </div>
  );
}

export default PopularCourses;
