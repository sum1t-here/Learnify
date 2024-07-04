import LearningCuate from "../assets/Learning-cuate.png";

function Landing() {
  return (
    <div className=" bg-[#F9C365] min-h-screen shadow-lg">
      <div className="flex flex-col text-center items-center pt-32 pr-5 pl-5 gap-3 lg:grid lg:grid-cols-2 lg:gap-10">
        <div className="text-3xl font-light lg:text-7xl ">
          <div className="font-outfit">
            Find the <span className="font-bold">BEST</span> online
          </div>
          <div className="font-bold font-outfit">COURSE &</div>
          <div className="font-bold font-outfit">LEARN</div>
        </div>
        <div className="flex flex-col gap-6 font-outfit justify-center items-center">
          <div className=" font-light p-8 text-2xl text-center lg:text-4xl lg:text-left">
            Speed up the skill acquisition process by finding the course that
            matches your niche
          </div>
          <div>
            <button className=" border border-black rounded-3xl p-2 drop-shadow-md cursor-pointer">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
      <div className="lg:flex lg:flex-col lg:justify-end lg:items-center">
        <img
          src={LearningCuate}
          alt="Learning cuate"
          className="lg:h-[470px] lg:w-[460px]"
        />
      </div>
    </div>
  );
}

export default Landing;
