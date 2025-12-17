import { useParams, useNavigate } from "react-router-dom";
import { Clock, Users, Calendar, Play, Check } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const levelColors = {
  Beginner: "bg-badge-beginner text-foreground",
  Medium: "bg-badge-medium text-foreground",
  Advance: "bg-badge-advance text-foreground",
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16 px-4 container">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Course not found
            </h1>
            <Button onClick={() => navigate("/courses")}>
              Browse Courses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handlePurchase = () => {
    toast.success("Redirecting to payment...");
    navigate(`/payment/${course.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Header */}
              <div>
                <Badge className={`${levelColors[course.level]} border-0 mb-4`}>
                  {course.level}
                </Badge>
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  {course.title}
                </h1>
                <p className="text-muted-foreground text-lg mb-6">
                  {course.description}
                </p>

                {/* Course Meta */}
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-xs">T</AvatarFallback>
                    </Avatar>
                    <span>Created By: <span className="text-foreground">{course.instructorName}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Last updated: {course.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Students enrolled: {course.studentsEnrolled}</span>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Description
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                </CardContent>
              </Card>

              {/* Course Content */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Course Content
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    No of lectures: {course.lectures.length}
                  </p>
                  <div className="space-y-3">
                    {course.lectures.map((lecture, index) => (
                      <div
                        key={lecture.id}
                        className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Play className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">
                            Lecture {index + 1}: {lecture.title}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {lecture.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="bg-card border-border overflow-hidden">
                  {/* Video Preview */}
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                      <div className="p-4 rounded-full bg-primary/90 cursor-pointer hover:bg-primary transition-colors">
                        <Play className="h-8 w-8 text-primary-foreground fill-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-foreground mb-6">
                      ₹{course.price.toLocaleString()}
                    </div>

                    <Button
                      onClick={handlePurchase}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-4"
                    >
                      Purchase Course
                    </Button>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-success" />
                        <span>Full lifetime access</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-success" />
                        <span>Access on mobile and desktop</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-success" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
