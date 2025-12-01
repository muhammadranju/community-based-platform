import Link from "next/link";
import { ArrowRight, Users, MessageSquare, UserPlus } from "lucide-react";

export default function GetInvolvedSection() {
  const actions = [
    {
      title:
        "Contribute To Our African Traditional Architecture Digital Archive",
      description:
        "Help us build the largest digital archive of African traditional architecture by contributing your photos and stories.",
      icon: Users,
      link: "#",
      buttonText: "Contribute",
    },
    {
      title: "Join Our Forum to start or contribute to ongoing discussions",
      description:
        "Engage with a community of enthusiasts and experts in our dedicated forum.",
      icon: MessageSquare,
      link: "#",
      buttonText: "Join Forum",
    },
    {
      title: "Register As A Trusted African Architect, Designer or Artisan",
      description:
        "Showcase your work and connect with potential clients and collaborators.",
      icon: UserPlus,
      link: "#",
      buttonText: "Register",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <span className="inline-block bg-[#84cc16] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            JOIN OUR COMMUNITY
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#064e3b]">
            Here are a few ways you can become a part of the village
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actions.map((action, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 border ${
                index === 0
                  ? "bg-[#064e3b] text-white border-[#064e3b]"
                  : "bg-white text-[#064e3b] border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <div
                  className={`p-2 rounded-full ${
                    index === 0 ? "bg-white/20" : "bg-[#064e3b]/10"
                  }`}
                >
                  <action.icon
                    className={`h-6 w-6 ${
                      index === 0 ? "text-white" : "text-[#064e3b]"
                    }`}
                  />
                </div>
                <span className="text-xs font-bold opacity-80">
                  {index === 0 ? "Team" : index === 1 ? "Forum" : "Register"}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-4 leading-tight">
                {action.title}
              </h3>
              <p
                className={`text-sm mb-8 ${
                  index === 0 ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {action.description}
              </p>

              <Link
                href={action.link}
                className={`inline-flex items-center px-6 py-2 rounded-full text-sm font-bold border transition-colors ${
                  index === 0
                    ? "border-white text-white hover:bg-white hover:text-[#064e3b]"
                    : "border-[#d97706] text-[#d97706] hover:bg-[#d97706] hover:text-white"
                }`}
              >
                {action.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
