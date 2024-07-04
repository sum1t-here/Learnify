import About from "../assets/About-us.png";

function AboutUs() {
  return (
    <div className="min-h-screen p-6 flex flex-col justify-center items-center font-outfit bg-gray-100">
      <div className="flex flex-col justify-center items-center gap-5 max-w-4xl mx-auto text-center">
        <h1 className="font-bold text-3xl lg:text-6xl text-gray-800">
          Welcome to Learnify
        </h1>
        <div className="mt-3 ">
          <img
            src={About}
            alt="About us"
            className="max-w-full h-auto rounded-lg shadow-lg lg:h-[470px] lg:w-[460px] lg:shadow-lg"
          />
        </div>
        <p className="text-lg lg:text-xl font-normal text-gray-600">
          At Learnify, we believe that education is the key to unlocking
          potential and achieving greatness. Founded with a passion for learning
          and a commitment to excellence, Learnify is your go-to platform for
          high-quality online courses designed to help you master new skills and
          advance your career.
        </p>
        <h3 className="font-bold text-2xl lg:text-3xl text-gray-800">
          Our Mission
        </h3>
        <p className="text-lg lg:text-xl text-gray-600">
          Our mission is to democratize education and make it accessible to
          everyone, everywhere. We aim to empower individuals by providing them
          with the tools and resources they need to learn effectively and
          efficiently. Whether you are a student, a professional, or a lifelong
          learner, Learnify is here to support your educational journey.
        </p>
        <h3 className="font-bold text-2xl lg:text-3xl text-gray-800">
          What We Offer
        </h3>
        <ul className="list-disc list-inside text-left text-lg lg:text-xl text-gray-600">
          <li>
            <span className="font-semibold">Diverse Course Catalog:</span> Our
            platform offers a wide range of courses across various fields,
            including technology, business, arts, and personal development. Each
            course is crafted by industry experts to ensure you receive the most
            up-to-date and relevant knowledge.
          </li>
          <li>
            <span className="font-semibold">Expert Instructors:</span> Learn
            from the best! Our instructors are seasoned professionals and
            educators who bring their real-world experience and expertise to
            each course.
          </li>
          <li>
            <span className="font-semibold">Flexible Learning:</span> We
            understand that everyone has different schedules and learning
            preferences. That is why our courses are designed to be flexible and
            self-paced, allowing you to learn at your convenience.
          </li>
          <li>
            <span className="font-semibold">Community Support:</span> Join a
            vibrant community of learners who share your passion for knowledge.
            Engage in discussions, collaborate on projects, and get support from
            peers and instructors whenever you need it.
          </li>
        </ul>
      </div>

      <div className="mt-10 max-w-4xl mx-auto text-center">
        <h1 className="font-bold text-3xl lg:text-4xl text-gray-800">
          Why Choose Learnify?
        </h1>
        <ul className="list-disc list-inside text-left text-lg lg:text-xl text-gray-600 mt-5">
          <li>
            <span className="font-semibold">Quality Education:</span> Our
            courses are meticulously designed to ensure a comprehensive and
            engaging learning experience.
          </li>
          <li>
            <span className="font-semibold">Affordability:</span> We believe
            that quality education should be accessible to all, which is why we
            offer our courses at competitive prices.
          </li>
          <li>
            <span className="font-semibold">Certifications:</span> Upon
            completing a course, you will receive a certificate that you can
            share with potential employers, showcasing your new skills and
            knowledge.
          </li>
          <li>
            <span className="font-semibold">Continuous Improvement:</span> We
            are committed to continuously improving our platform and courses
            based on feedback from our learners to ensure the best possible
            educational experience.
          </li>
        </ul>
        <p className="text-lg lg:text-xl text-gray-600 mt-5">
          Join Us Today At Learnify, we are more than just an online learning
          platform; we are a community of learners and educators dedicated to
          fostering growth and innovation. Join us today and take the first step
          towards achieving your educational and professional goals. Together,
          lets learn, grow, and succeed.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
