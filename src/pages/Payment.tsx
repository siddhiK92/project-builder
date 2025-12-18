import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { courses } from "@/data/courses";
import { toast } from "sonner";
import { CreditCard, Lock } from "lucide-react";

const Payment = () => {
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
            <Button onClick={() => navigate("/courses")}>Browse Courses</Button>
          </div>
        </div>
      </div>
    );
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Payment successful! You are now enrolled.");
    navigate("/my-learning");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
            Complete Your Purchase
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      By {course.instructorName}
                    </p>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{course.price.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    <Lock className="h-4 w-4 mr-2" />
                    Pay ₹{course.price.toLocaleString()}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Your payment is secure and encrypted
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;