import { useState, useEffect, useRef } from "react";
import { Instagram, Linkedin, Twitter } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Augustin MANIRAKIZA",
    role: "Managing Director",
    bio: "Visionary entrepreneur and strategic leader with expertise spanning healthcare, technology, and logistics.",
    image: "/Augustin.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/manirakiza-augustin-01aa70143/",
      instagram: "https://www.instagram.com/manistin1000/?hl=en",
      twitter: "https://x.com/Manistin1000"
    }
  }
];

const TeamSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <div className="text-yellow-400 font-medium mb-2 relative inline-block">
              <span className="relative z-10">MEET OUR EXPERTS</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-100 -z-10 transform -rotate-1"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 relative inline-block">
              <span className="text-gradient">Our Team</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-techblue-500 to-techpurple"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The brilliant minds behind Iru Business Group Ltd innovation and success.
              Each member brings unique expertise and passion to our mission.
            </p>
          </div>

          {/* Centered and widened card */}
          <div className="grid grid-cols-1 gap-8 max-w-7xl mx-auto place-items-center">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`${
                  isVisible ? "animate-fade-in" : "opacity-0"
                } transform transition-all duration-500`}
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="bg-[#f2f2f2] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center p-8 max-w-md w-full">
                  <div className="mx-auto w-44 h-44 rounded-full overflow-hidden mb-6 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <h3 className="font-bold text-2xl text-gray-800 mb-2">{member.name}</h3>
                  <div className="text-yellow-700 font-bold font-medium text-lg mb-4">{member.role}</div>

                  <p className="text-gray-600 mb-6">{member.bio}</p>

                  <div className="flex justify-center space-x-4">
                    {member.social.instagram && (
                      <a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Instagram size={20} className="text-black" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Linkedin size={20} className="text-black" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Twitter size={20} className="text-black" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
