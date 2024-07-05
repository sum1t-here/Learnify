import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CourseList from "./pages/Courses/CourseList";
import ContactPage from "./pages/ContactPAge";
import Denied from "./pages/Denied";
import CourseDescription from "./pages/Courses/CourseDescription";
import RequireAuth from "./components/Auth/RequireAuth";
import CreateCourse from "./pages/Courses/CreateCourse";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/course/description" element={<CourseDescription />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/denied" element={<Denied />} />
          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
            <Route path="/course/create" element={<CreateCourse />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
