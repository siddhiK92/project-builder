import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, Play } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { toast } from "sonner";

const ViewCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);
  const [currentLecture, setCurrentLecture] = useState(0);
  const [completedLectures, setCompletedLectures] = useState<number[]>([]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header isLoggedIn={true} />
        <div className="pt-24 pb-16 px-4 container">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Course not found
            </h1>
            <Button onClick={() => navigate("/my-learning")}>
              Go to My Learning
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleMarkComplete = () => {
    if (!completedLectures.includes(currentLecture)) {
      setCompletedLectures([...completedLectures, currentLecture]);
      toast.success("Lecture marked as completed!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} userName="Student" />

      <main className="pt-24 pb-16 px-4">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
            <Button
              onClick={handleMarkComplete}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Mark as completed
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-border overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={course.thumbnail}
                    alt={course.lectures[currentLecture].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                    <div className="p-6 rounded-full bg-primary/90 cursor-pointer hover:bg-primary transition-colors">
                      <Play className="h-12 w-12 text-primary-foreground fill-primary-foreground" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Lecture {currentLecture + 1}: {course.lectures[currentLecture].title}
                  </h2>
                </CardContent>
              </Card>
            </div>

            {/* Lecture List */}
            <div className="lg:col-span-1">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Course Lecture
                  </h2>
                  <div className="space-y-2">
                    {course.lectures.map((lecture, index) => (
                      <button
                        key={lecture.id}
                        onClick={() => setCurrentLecture(index)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                          currentLecture === index
                            ? "bg-primary/20 border border-primary"
                            : "bg-secondary hover:bg-secondary/80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {completedLectures.includes(index) ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Play className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm text-foreground">
                            Lecture {index + 1}: {lecture.title}
                          </span>
                        </div>
                        {completedLectures.includes(index) && (
                          <span className="text-xs text-success bg-success/10 px-2 py-1 rounded">
                            Completed
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewCourse;
