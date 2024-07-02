import AppFeatures from "../components/AppFeatures";
import Landing from "../components/Landing";
import PopularCourses from "../components/PopularCourses";
import Services from "../components/Services";

function HomePage() {
  return (
    <div>
      <Landing />
      <Services />
      <AppFeatures />
      <PopularCourses />
    </div>
  );
}

export default HomePage;
