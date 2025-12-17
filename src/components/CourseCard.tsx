import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

export interface CourseCardProps {
  id: string;
  title: string;
  thumbnail: string;
  instructorName: string;
  instructorAvatar?: string;
  level: "Beginner" | "Medium" | "Advance";
  price: number;
}

const levelColors = {
  Beginner: "bg-badge-beginner text-foreground",
  Medium: "bg-badge-medium text-foreground",
  Advance: "bg-badge-advance text-foreground",
};

const CourseCard = ({
  id,
  title,
  thumbnail,
  instructorName,
  instructorAvatar,
  level,
  price,
}: CourseCardProps) => {
  return (
    <Link to={`/course/${id}`}>
      <Card className="group overflow-hidden bg-card border-border card-hover cursor-pointer">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={instructorAvatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs bg-muted">
                  {instructorName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{instructorName}</span>
            </div>
            <Badge className={`${levelColors[level]} border-0 text-xs`}>
              {level}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0">
          <span className="text-lg font-bold text-foreground">₹{price.toLocaleString()}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
