import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="hero-gradient pt-32 pb-20 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
          Find the Best Courses for You
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form onSubmit={handleSearch} className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search Courses"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-4 pr-4 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button type="submit" className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </form>

        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => navigate("/courses")}
          >
            Explore Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
