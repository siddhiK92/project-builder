import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    return {
      isValid: hasUpperCase && hasNumber && hasSpecialChar && hasMinLength,
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
      hasMinLength,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      toast.error("Password must have at least 8 characters, one uppercase, one number, and one special character");
      return;
    }

    toast.success("Account created successfully!");
    navigate("/login");
  };

  const passwordCheck = validatePassword(formData.password);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="p-2 rounded-lg bg-primary/10">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <span className="text-2xl font-bold text-foreground">Elevate</span>
        </Link>

        <Card className="bg-card border-border">
          <CardHeader className="text-center">
            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login" onClick={() => navigate("/login")}>
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup">Signup</TabsTrigger>
              </TabsList>
            </Tabs>
            <CardTitle className="text-2xl font-bold text-foreground">Signup</CardTitle>
            <CardDescription className="text-muted-foreground">
              Create a new account and click signup when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Eg. Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Eg. patel@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Eg. Xyz@123"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-secondary border-border pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {formData.password && (
                  <div className="text-xs space-y-1 mt-2">
                    <p className={passwordCheck.hasMinLength ? "text-success" : "text-muted-foreground"}>
                      ✓ At least 8 characters
                    </p>
                    <p className={passwordCheck.hasUpperCase ? "text-success" : "text-muted-foreground"}>
                      ✓ At least one uppercase letter
                    </p>
                    <p className={passwordCheck.hasNumber ? "text-success" : "text-muted-foreground"}>
                      ✓ At least one number
                    </p>
                    <p className={passwordCheck.hasSpecialChar ? "text-success" : "text-muted-foreground"}>
                      ✓ At least one special character
                    </p>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Signup
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
