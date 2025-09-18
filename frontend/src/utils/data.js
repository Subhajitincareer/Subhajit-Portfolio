export const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "web",
      image: "/assets/images/project-1.jpg"
    },
    // Add more projects
  ];
  
  export const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "CTO",
      text: "Excellent work!",
      avatar: "/assets/images/avatar-1.png"
    },
    // Add more testimonials
  ];


  
export const getFilteredProjects = (filter) => {
  if (filter === 'all') return projects;
  return projects.filter(project => project.category === filter);
};