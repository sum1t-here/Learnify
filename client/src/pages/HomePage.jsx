import Landing from "../components/Landing";
import PopularCourses from "../components/PopularCourses";
import Services from "../components/Services";

function HomePage() {
  return (
    <div>
      <Landing />
      <Services />
      <PopularCourses />
    </div>
  );
}

export default HomePage;
