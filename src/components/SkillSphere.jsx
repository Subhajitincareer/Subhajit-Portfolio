// components/SkillSphere.jsx
import { Canvas } from '@react-three/fiber';
import { Points, OrbitControls,PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useSkillStore } from '../store/useSkillStore';
import { useMemo } from 'react';

const SkillPoints = () => {
  const { skills } = useSkillStore();
  
  // Create new array for positions
  const points = useMemo(() => {
    return skills.flatMap((skill) => {
      const position = new Float32Array(3);
      random.inSphere(position, { radius: 3 });
      return {
        position: Array.from(position), // Convert to regular array
        size: Math.sqrt(skill.level) * 0.15,
        color: skill.color,
        label: skill.name
      };
    });
  }, [skills]);

  return (
    <Points>
      <PointMaterial
        size={0.1}
        depthWrite={false}
        vertexColors
      />
      {points.map((point, i) => (
        <mesh 
          key={i} 
          position={point.position} // Use array directly
        >
          <sphereGeometry args={[point.size, 16, 16]} />
          <meshStandardMaterial color={point.color} />
        </mesh>
      ))}
    </Points>
  );
};

export default function SkillSphere() {
  return (
    <div className="h-96 w-full bg-gradient-to-br from-#353839 to-#1e1e1f rounded-2xl">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SkillPoints />
        <OrbitControls 
          enableZoom={false} 
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}