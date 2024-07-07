import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

function DashBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    fontColor: "white",
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["#F59E0B", "#10B981"], // yellow, green
        borderWidth: 1,
        borderColor: ["#F59E0B", "#10B981"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["#EF4444"], // red
        borderColor: ["#FFFFFF"], // white
        borderWidth: 2,
      },
    ],
  };

  const myCourses = useSelector((state) => state?.course?.courseData);

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course?")) {
      const res = await dispatch(deleteCourse(id));
      console.log(res);
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white font-outfit">
      <h1 className="text-center text-5xl font-semibold text-yellow-500">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-5 m-auto mx-10">
        <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md bg-gray-800">
          <div className="w-80 h-80">
            <Pie data={userData} />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md bg-gray-700">
              <div className="flex flex-col items-center">
                <p className="font-semibold text-yellow-500">
                  Registered Users
                </p>
                <h3 className="text-4xl font-bold text-white">
                  {allUsersCount}
                </h3>
              </div>
              <FaUsers className="text-yellow-500 text-5xl" />
            </div>
            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md bg-gray-700">
              <div className="flex flex-col items-center">
                <p className="font-semibold text-green-500">Subscribed Users</p>
                <h3 className="text-4xl font-bold text-white">
                  {subscribedCount}
                </h3>
              </div>
              <FaUsers className="text-green-500 text-5xl" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md bg-gray-800">
          <div className="h-80 w-full relative">
            <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md bg-gray-700">
              <div className="flex flex-col items-center">
                <p className="font-semibold text-yellow-500">
                  Subscription Count
                </p>
                <h3 className="text-4xl font-bold text-white">
                  {allPayments?.count}
                </h3>
              </div>
              <FcSalesPerformance className="text-yellow-500 text-5xl" />
            </div>
            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md bg-gray-700">
              <div className="flex flex-col items-center">
                <p className="font-semibold text-green-500">Total Revenue</p>
                <h3 className="text-4xl font-bold text-white">
                  {allPayments?.count * 499}
                </h3>
              </div>
              <GiMoneyStack className="text-green-500 text-5xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-center text-3xl font-semibold text-yellow-500">
            Courses overview
          </h1>

          <button
            onClick={() => {
              navigate("/course/create");
            }}
            className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg text-white cursor-pointer"
          >
            Create new course
          </button>
        </div>

        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="px-6 py-3 text-yellow-500 font-medium text-sm">
                S No
              </th>
              <th className="px-6 py-3 text-yellow-500 font-medium text-sm">
                Course Title
              </th>
              <th className="px-6 py-3 text-yellow-500 font-medium text-sm">
                Course Category
              </th>
              <th className="px-6 py-3 text-yellow-500 font-medium text-sm">
                Instructor
              </th>
              <th className="px-6 py-3 text-yellow-500 font-medium text-sm">
                Total Lectures
              </th>
              <th className="px-6 py-3 text-yellow-500 font-medium text-sm">
                Description
              </th>
              <th className="px-6 py-3 text-yellow-500 font-medium text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {myCourses?.map((course, idx) => (
              <tr
                key={course._id}
                className="border-b border-gray-700 last:border-none"
              >
                <td className="px-6 py-4 text-white">{idx + 1}</td>
                <td className="px-6 py-4">
                  <textarea
                    readOnly
                    value={course?.title}
                    className="w-full bg-transparent resize-none text-white border-none outline-none"
                  ></textarea>
                </td>
                <td className="px-6 py-4 text-white">{course?.category}</td>
                <td className="px-6 py-4 text-white">{course?.createdBy}</td>
                <td className="px-6 py-4 text-white">
                  {course?.numberOfLectures}
                </td>
                <td className="px-6 py-4 text-white max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  <textarea
                    readOnly
                    value={course?.description}
                    className="w-full bg-transparent resize-none text-white border-none outline-none"
                  />
                </td>
                <td className="px-6 py-4 flex items-center gap-4">
                  <button
                    className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold text-white"
                    onClick={() =>
                      navigate("/course/displaylectures", {
                        state: { ...course },
                      })
                    }
                  >
                    <BsCollectionPlayFill />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold text-white"
                    onClick={() => onCourseDelete(course?._id)}
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashBoard;
