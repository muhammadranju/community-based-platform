import {
  Database,
  FileText,
  Image,
  MessageSquare,
  UserPlus,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import HomeBadge from "./HomeBadge";

export default function GetInvolvedSection() {
  const actions = [
    {
      title:
        "Contribute To Our African Traditional Architecture Digital Archive",
      description:
        "Upload your original photos, videos, or documents of traditional African architecture to preserve and share our Indigenous knowledge. Let’s celebrate our culture, honor our ancestors, and pass this legacy on to future generations",
      icon: Users,
      link: "#",
      buttonText: "Contribute",
    },
    {
      title: "Join Our Forum to start or contribute  to ongoing discussions",
      description:
        "Invite a friend and join ongoing discussions, create a new topic, or ask questions, all centered around African Indigenous Architecture. Let’s build community and continue to challenge each others perspectives.",
      icon: MessageSquare,
      link: "#",
      buttonText: "Join Forum",
    },
    {
      title: "Register As A Trusted African Architect, Designer or Builder",
      description:
        "Join our growing database of African professionals who are passionate about Indigenous African Architecture. Our goal is to connect these professionals with prospective home owners.",
      icon: Database,
      link: "#",
      buttonText: "Register",
    },
  ];

  return (
    <section className="lg:py-28 py-12 bg-white">
      <div className="mb-12">
        <HomeBadge>JOIN OUR COMMUNITY</HomeBadge>
        <h2 className="text-3xl md:text-4xl max-w-2xl font-bold text-primary-color">
          Here are a few ways you can become a part of the village
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {actions.map((action, index) => (
          <div
            key={index}
            className={`rounded-3xl p-8 border ${
              index === 0
                ? "bg-primary-color text-white border-primary-color"
                : "bg-white text-primary-color border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-6">
              {index === 0 ? (
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-full bg-white">
                    <Image className="text-primary-color" />
                  </span>
                  <span className="text-xs font-bold opacity-80 flex items-center gap-2">
                    Photo
                  </span>{" "}
                  <span className="p-2 rounded-full bg-white">
                    <Video className="text-primary-color" />
                  </span>
                  <span className="text-xs font-bold opacity-80">Video</span>{" "}
                  <span className="p-2 rounded-full bg-white">
                    <FileText className="text-primary-color" />
                  </span>
                  <span className="text-xs font-bold opacity-80">Document</span>
                </div>
              ) : (
                <div
                  className={`p-2 rounded-full ${
                    index === 0 ? "bg-white/20" : "bg-primary-color/10"
                  }`}
                >
                  <action.icon
                    className={`h-6 w-6 ${
                      index === 0 ? "text-white" : "text-primary-color"
                    }`}
                  />
                </div>
              )}

              <span className="text-xs font-bold opacity-80">
                {index === 0 ? "" : index === 1 ? "Forum" : "Database"}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-4 leading-tight max-w-10/12">
              {action.title}
            </h3>
            <p
              className={`text-sm mb-8 lg:block hidden ${
                index === 0 ? "text-gray-300" : "text-gray-600 "
              }`}
            >
              {action.description}
            </p>

            <Link
              href={action.link}
              className={`inline-flex items-center px-6 py-2 rounded-full text-sm font-bold border transition-colors ${
                index === 0
                  ? "border-white text-white hover:bg-white hover:text-primary-color"
                  : "border-secondary-color text-primary-color hover:bg-secondary-color hover:text-white"
              }`}
            >
              {action.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
