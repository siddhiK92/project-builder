import Header from "@/components/Header";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";

const MyLearning = () => {
  // Mock enrolled courses (first 2 courses)
  const enrolledCourses = courses.slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} userName="Student" />

      <main className="pt-24 pb-16 px-4">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-8">MY LEARNING</h1>
          <h2 className="text-xl text-muted-foreground mb-6">My Learning</h2>

          {enrolledCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                You haven't enrolled in any courses yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {enrolledCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CourseCard
                    id={course.id}
                    title={course.title}
                    thumbnail={course.thumbnail}
                    instructorName={course.instructorName}
                    level={course.level}
                    price={course.price}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyLearning;
