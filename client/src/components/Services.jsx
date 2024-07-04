import WebinarCuate from "../assets/Webinar-cuate.png";

function Services() {
  return (
    <div className="bg-[#FBF4E2] font-outfit flex flex-col justify-center items-center min-h-screen gap-5 p-5 shadow-lg lg:grid lg:grid-cols-2">
      <div>
        <img src={WebinarCuate} alt="webinar" />
      </div>
      <div className=" text-5xl font-light flex flex-col justify-center items-center gap-2 lg:text-8xl">
        <div>We provide </div>
        <div className="flex flex-row items-center justify-center">
          <div className="border border-[#F9C365] bg-[#F9C365] rounded-full p-3 lg:p-5 flex justify-center items-center">
            <span className="font-petit text-4xl font-normal lg:text8xl">
              Smart
            </span>
          </div>
          online
        </div>
        <div>education</div>
        <div className="p-8 flex flex-col items-center justify-center">
          <p className="text-extralight text-sm">
            Our online learning platform features interactive video lectures,
            quizzes, real-time collaboration, personalized learning paths,
            progress tracking, virtual classrooms, and live webinars for a
            comprehensive learning experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
