import { create } from "zustand";

export const useSkillStore = create((set) => ({
  skills: [
    { name: "HTML", level: 100, color: "#FF5733" },
    { name: "CSS", level: 90, color: "#264de4" },
    { name: "JavaScript", level: 85, color: "#F7DF1E" },
    { name: "Tailwind CSS", level: 80, color: "#38B2AC" },
    { name: "React.js", level: 85, color: "#61DAFB" },
    { name: "Redux Toolkit", level: 80, color: "#764ABC" },
    { name: "Node.js", level: 85, color: "#68A063" },
    { name: "Express.js", level: 80, color: "#000000" },
    { name: "MongoDB", level: 80, color: "#4DB33D" },
    { name: "Mongoose", level: 75, color: "#880000" },
    { name: "REST API", level: 80, color: "#008080" },
    { name: "Postman", level: 75, color: "#EF5B25" },
    { name: "Nodemon", level: 70, color: "#76D04B" },
    { name: "AWS", level: 65, color: "#FF9900" },
  ],

  hoveredSkill: null,
  setHoveredSkill: (skill) => set({ hoveredSkill: skill }),
}));
