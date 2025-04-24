
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: "complaint",
      image: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
      title: "Post a Complaint",
      description: "We are committed to receiving your complaint.",
      route: "/post"
    },
    {
      id: "rate-toilet",
      image: "https://cdn-icons-png.flaticon.com/512/3448/3448604.png",
      title: "Rate Public Toilet",
      description: "Scan QR Code.",
      route: "/rate-toilet"
    },
    {
      id: "locator",
      image: "https://cdn-icons-png.flaticon.com/512/854/854992.png",
      title: "SBM Toilet Locator",
      description: "Find the nearest toilet.",
      route: "/locator"
    },
    {
      id: "feedback",
      image: "https://cdn-icons-png.flaticon.com/512/2958/2958783.png",
      title: "Provide Feedback",
      description: "Tell your experience of MITS_Swachhata App.",
      route: "/feedback"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Good Afternoon, Active Citizen</h1>
          <p className="text-gray-600">Here are today's actions for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="p-6 text-center cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg"
              onClick={() => navigate(card.route)}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-16 h-16 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default HomePage;
