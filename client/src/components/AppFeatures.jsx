function AppFeatures() {
  return (
    <div className="bg-[#FBF8F3] flex flex-col justify-center items-center gap-4 min-h-screen">
      <div className="p-4 mt-16 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="border p-12 rounded-lg bg-black text-white text-3xl font-light lg:text-6xl lg:flex lg:flex-col lg:justify-center lg:items-center">
          <div className="flex flex-row items-center gap-1">
            Our
            <div>
              <span className="text-[#F9C365] font-petit">Features</span>
            </div>
          </div>
          <div>Special for you</div>
        </div>
        <div className="flex flex-col gap-3 pt-7 justify-center items-center lg:flex-row">
          <div className="bg-[#D9D9D9] h-48 w-60 rounded-lg"></div>
          <div className="bg-[#D9D9D9] h-48 w-60 rounded-lg"></div>
          <div className="bg-[#D9D9D9] h-48 w-60 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default AppFeatures;
