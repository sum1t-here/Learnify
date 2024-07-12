import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCourseLectures } from "../../Redux/Slices/LectureSlice";

function AddLectures() {
  const courseDetails = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);

    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }

    const formData = new FormData();
    formData.append("lecture", userInput.lecture);
    formData.append("title", userInput.title);
    formData.append("description", userInput.description);
    formData.append("id", userInput.id); // Append 'id' as part of the form data

    try {
      const response = await dispatch(addCourseLectures(formData));
      if (response?.payload?.success) {
        navigate(-1);
        setUserInput({
          id: courseDetails?._id,
          lecture: undefined,
          title: "",
          description: "",
          videoSrc: "",
        });
      } else {
        toast.error("Failed to add lecture. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  }

  useEffect(() => {
    if (!courseDetails) navigate("/courses");
  }, []);

  return (
    <div className="min-h-[90vh] text-black flex flex-col items-center justify-center gap-10 mx-16">
      <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_rgba(0,0,0,0.3)] w-96 rounded-lg bg-gray-50">
        <header className="flex items-center justify-center relative">
          <button
            className="absolute left-2 text-xl text-gray-700"
            onClick={() => navigate(-1)}
          >
            <AiOutlineArrowLeft />
          </button>
          <h1 className="text-xl text-green-500 font-semibold">
            Add new lecture
          </h1>
        </header>
        <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Enter the title of the lecture"
            onChange={handleInputChange}
            className="bg-transparent px-3 py-1 border border-gray-300 rounded"
            value={userInput.title}
          />
          <textarea
            type="text"
            name="description"
            placeholder="Enter the description of the lecture"
            onChange={handleInputChange}
            className="bg-transparent px-3 py-1 border border-gray-300 rounded resize-none overflow-y-scroll h-36"
            value={userInput.description}
          />
          {userInput.videoSrc ? (
            <video
              muted
              src={userInput.videoSrc}
              controls
              controlsList="nodownload nofullscreen"
              disablePictureInPicture
              className="object-fill rounded-lg w-full"
            />
          ) : (
            <div className="h-48 border border-gray-300 rounded flex items-center justify-center cursor-pointer">
              <label
                className="font-semibold text-gray-500 cursor-pointer"
                htmlFor="lecture"
              >
                Choose your video
              </label>
              <input
                type="file"
                className="hidden"
                id="lecture"
                name="lecture"
                onChange={handleVideo}
                accept="video/mp4, video/x-mp4, video/*"
              />
            </div>
          )}
          <button
            type="submit"
            className=" py-1 font-semibold text-lg bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add new Lecture
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLectures;
