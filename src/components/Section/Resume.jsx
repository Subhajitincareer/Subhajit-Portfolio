// components/sections/Resume.jsx
import { motion } from "framer-motion";
import { FaBook, FaBriefcase } from "react-icons/fa";
import { useSkillStore } from "../../store/useSkillStore";
import SkillSphere from "../SkillSphere";

const TimelineItem = ({ title, date, description, icon }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="relative pl-8 pb-8 border-l-2 border-jet"
  >
    <div className="absolute w-4 h-4 bg-gradient-yellow rounded-full -left-[9px] top-0 shadow-lg" />
    <div className="flex items-center gap-4 mb-2">
      <div className="bg-gradient-onyx p-2 rounded-lg">{icon}</div>
      <div>
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-vegas-gold text-sm">{date}</p>
      </div>
    </div>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const TimelineSection = ({ title, items, icon }) => (
  <div className="bg-eerie-black rounded-xl p-6 shadow-lg">
    <h3 className="text-xl text-white font-semibold mb-6 flex items-center gap-2">
      {icon}
      {title}
    </h3>
    <div className="space-y-6">
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} icon={icon} />
      ))}
    </div>
  </div>
);

export default function Resume() {
  const { skills, hoveredSkill, setHoveredSkill } = useSkillStore();

  const educationItems = [
    {
      title: "Web Development in freeCodeCamp",
      date: "2024 - Present",
      description:
        " freecodecamp - focus on javascript MERN stack developer",
    },
    {
      title: "Diploma in Elementary Education (D.El.Ed)",
      date: "2024- Present",
      description: "Focused on child pedagogy, teaching methodologies, educational psychology, and classroom management.",
    },


    {
      title: "Class 12 - Humanities",
      date: "2024",
      description: "Studied Philosophy, History, Sanskrit, and Geography with a focus on critical thinking, cultural studies, and analytical skills."
    }
   

  ];

  {/*const experienceItems = [
    {
      title: "",
      date: "",
      description:"",
    },
  ];*/}

  return (
    <article className="bg-eerie-black rounded-2xl p-8 shadow-xl">
      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-white pb-4 border-b border-jet">
          Resume
        </h2>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <TimelineSection
            title="Education"
            items={educationItems}
            icon={<FaBook className="text-vegas-gold" />}
          />

          {/*<TimelineSection
            title="Experience"
            items={experienceItems}
            icon={<FaBriefcase className="text-vegas-gold" />}
          />*/}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <section className="bg-eerie-black rounded-xl p-6 shadow-lg">
            <h3 className="text-xl text-white font-semibold mb-6">
              Technical Skills
            </h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-6 rounded-xl bg-gradient-onyx relative"
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-orange-yellow">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-jet rounded-full mt-2">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

         {/*<div className="relative">
            <SkillSphere />
            {hoveredSkill && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-onyx p-4 rounded-lg shadow-lg">
                <h3 className="text-white text-lg font-semibold">
                  {hoveredSkill.name}
                </h3>
                <p className="text-orange-yellow">
                  Proficiency: {hoveredSkill.level}%
                </p>
              </div>
            )}
          </div>*/ } 
        </div>
      </div>
    </article>
  );
}
