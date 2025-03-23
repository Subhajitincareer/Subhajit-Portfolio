import { TestimonialCard, ClientLogos } from "../common";
import { motion } from "motion/react";
export default function About() {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-eerie-black rounded-2xl p-8 shadow-xl"
    >
      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-white pb-4 border-b border-jet">
          About Me
        </h2>
      </header>

      <section className="space-y-8">
        <div className="text-gray-400 space-y-4 leading-relaxed">
          <p>Hi, I'm Subhajit Pal, a passionate MERN Stack Developer with one year of hands-on experience in building dynamic and responsive web applications. As a self-taught developer, I thrive on solving complex problems and continuously expanding my knowledge to stay ahead in the ever-evolving world of web development.</p>{" "}
          <p>I specialize in:<br/>
✅ MongoDB – Efficient database design & management <br/>
✅ Express.js – Backend API development<br/>
✅ React.js – Building interactive user interfaces<br/>
✅ Node.js – Scalable and high-performance server-side applications</p>

<p>From crafting full-stack web applications to optimizing user experiences, I love transforming ideas into functional, real-world solutions. My journey in development has been fueled by curiosity, perseverance, and a deep love for coding.</p>
<p>I’m always open to new challenges, collaborations, and learning opportunities. Let's connect and build something amazing! 🚀</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ServiceItem
            icon="src/assets/images/icon-dev.svg"
            title="Web Development"
            description="Building full-stack applications with modern frameworks"
          />
        </div>
{/*    <section className="space-y-6">
          <h3 className="text-2xl text-white font-semibold">Testimonials</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard
              avatar="/assets/images/avatar-1.png"
              name="John Doe"
              role="CTO at Tech Corp"
              text="Exceptional work delivered on time with great attention to detail."
            />
            <TestimonialCard
              avatar="/assets/images/avatar-2.png"
              name="Jane Smith"
              role="Product Manager"
              text="Transformed our legacy system into a modern web platform."
            />
          </div>
        </section>*/}
     {/*<ClientLogos /> */}

        
      </section>
    </motion.article>
  );
}

const ServiceItem = ({ icon, title, description }) => (
  <div className="p-6 rounded-xl bg-gradient-onyx relative before:absolute before:inset-px before:bg-eerie-black before:rounded-xl">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-gradient-onyx p-3 rounded-lg">
        <img src={icon} alt={title} className="w-8 h-8" />
      </div>
      <h3 className="text-xl text-white">{title}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
  </div>
);
