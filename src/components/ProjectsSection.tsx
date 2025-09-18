import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectNode {
  id: string;
  group: string;
  desc: string;
  link: string;
  color: string;
}

const ProjectsSection = () => {
  const { t } = useLanguage();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [hoveredNode, setHoveredNode] = useState<ProjectNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectNode | null>(null);

  // Parallax scrolling setup
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, -200]);

  const projects: ProjectNode[] = [
    { id: "IRU BUSINESS GROUP Ltd", group: "core", desc: "Parent company & innovation hub", link: "https://iru-businessgroup.com", color: "#ffd54d" },
    { id: "IRUCORE AI", group: "ai", desc: "Core AI engine powering the IRU ecosystem", link: "https://iru-core.ai", color: "#3aa0ff" },
    { id: "IRU Genix", group: "ai", desc: "AI-driven drug discovery & development", link: "https://iru-genix.com", color: "#3aa0ff" },
    { id: "IRU Mechx", group: "ai", desc: "Robotics & mechanical AI solutions", link: "https://iru-mechx.com", color: "#3aa0ff" },
    { id: "IRU UMOJA", group: "ai", desc: "Pan-African collaboration & innovation hub", link: "https://iru-umoja.com", color: "#3aa0ff" },
    { id: "IRUCARE", group: "health", desc: "Digital health & clinic management", link: "https://iru-care.com", color: "#3ddc84" },
    { id: "IRU Haven", group: "health", desc: "Elderly care & caregiver network", link: "https://iru-haven.com", color: "#3ddc84" },
    { id: "IRU Mart", group: "business", desc: "Smart e-commerce marketplace", link: "https://iru-mart.com", color: "#ffb86b" },
    { id: "IRU Board", group: "business", desc: "Secure virtual boardroom for executives", link: "https://iru-board.com", color: "#ffb86b" },
    { id: "Corporate Website", group: "business", desc: "IRU Business Group corporate portal", link: "https://iru-businessgroup.com", color: "#ffb86b" },
    { id: "IRU Love", group: "lifestyle", desc: "Matchmaking & relationship platform", link: "https://iru-love.com", color: "#e86fb2" },
    { id: "IRU OneLife", group: "lifestyle", desc: "Lifestyle & social hub (social aggregator)", link: "https://iru-onelife.com", color: "#e86fb2" },
    { id: "Frame & Tune Studio", group: "lifestyle", desc: "Creative media & studio services", link: "https://frameandtune.com", color: "#e86fb2" },
    { id: "IRU Chat", group: "lifestyle", desc: "Secure intelligent chat platform", link: "https://iru-chat.com", color: "#e86fb2" }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.group === selectedFilter || p.group === 'core');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI & Tech' },
    { id: 'health', label: 'Health & Care' },
    { id: 'business', label: 'Business & Commerce' },
    { id: 'lifestyle', label: 'Lifestyle & Community' }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleNodeClick = (project: ProjectNode) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#071028] via-[#081428] to-[#081930] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            IRU Ecosystem
          </h2>
          <p className="text-[#9fb0c8] text-lg max-w-3xl mx-auto">
            Interactive network map: hover nodes, click for details
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-32">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedFilter === filter.id
                  ? 'bg-blue-500 text-white shadow-lg transform -translate-y-1'
                  : 'bg-white/5 text-[#9fb0c8] border border-white/10 hover:bg-white/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Radial Network Map */}
        <motion.div 
          ref={containerRef}
          className="relative w-full h-[800px] rounded-2xl overflow-hidden shadow-2xl"
          style={{ y: y1 }}
          onMouseMove={handleMouseMove}
        >
          <svg
            ref={svgRef}
            className="w-full h-full"
            viewBox="0 0 1000 800"
          >
            {/* Background gradient */}
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffd54d" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#ffd54d" stopOpacity="0.06" />
                <stop offset="100%" stopColor="rgba(255,213,77,0)" />
              </radialGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="4.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Category rings */}
            <circle cx="500" cy="400" r="350" fill="none" stroke="#3aa0ff" strokeOpacity="0.06" strokeWidth="1"/>
            <circle cx="500" cy="400" r="420" fill="none" stroke="#3ddc84" strokeOpacity="0.06" strokeWidth="1"/>
            <circle cx="500" cy="400" r="490" fill="none" stroke="#ffb86b" strokeOpacity="0.06" strokeWidth="1"/>
            <circle cx="500" cy="400" r="560" fill="none" stroke="#e86fb2" strokeOpacity="0.06" strokeWidth="1"/>

            {/* Center pulse effect */}
            <circle cx="500" cy="400" r="95" fill="url(#centerGlow)" opacity="0.9">
              <animateTransform
                attributeName="transform"
                type="scale"
                values="1;1.02;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Center node */}
            <circle 
              cx="500" 
              cy="400" 
              r="60" 
              fill="#ffd54d" 
              filter="url(#glow)" 
              stroke="#fff" 
              strokeOpacity="0.06"
              strokeWidth="2.5"
              className="cursor-pointer"
              onClick={() => handleNodeClick(projects[0])}
              onMouseEnter={() => setHoveredNode(projects[0])}
              onMouseLeave={() => setHoveredNode(null)}
            />
            <text x="500" y="406" textAnchor="middle" fill="#08111a" fontWeight="700" fontSize="20">
              IRU
            </text>

            {/* Project nodes */}
            {filteredProjects.slice(1).map((project, index) => {
              const angle = (index * 2 * Math.PI) / (filteredProjects.length - 1);
              const radius = 300;
              const x = 500 + Math.cos(angle) * radius;
              const y = 400 + Math.sin(angle) * radius;

              return (
                <g key={project.id}>
                  {/* Connection line */}
                  <line
                    x1="500"
                    y1="400"
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1.2"
                  />
                  
                  {/* Node circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r="25"
                    fill={project.color}
                    stroke="#081426"
                    strokeWidth="1.2"
                    className="cursor-pointer hover:r-8 transition-all duration-300"
                    onClick={() => window.open(project.link, '_blank')}
                    onMouseEnter={() => setHoveredNode(project)}
                    onMouseLeave={() => setHoveredNode(null)}
                  />
                  
                  {/* Node label */}
                  <text
                    x={x}
                    y={y + 40}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.85)"
                    fontSize="13"
                    className="pointer-events-none"
                  >
                    {project.id}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hoveredNode && (
            <div
              className="absolute pointer-events-none z-30 bg-white text-gray-800 p-4 rounded-lg shadow-2xl text-sm max-w-xs border border-gray-200"
              style={{
                left: tooltipPosition.x - 150,
                top: tooltipPosition.y - 100,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="font-bold text-gray-900 mb-2">{hoveredNode.id}</div>
              <div className="text-gray-600 text-xs leading-relaxed">{hoveredNode.desc}</div>
              {hoveredNode.id !== "IRU BUSINESS GROUP Ltd" && (
                <div className="text-orange-500 text-xs mt-2 font-medium">Click to visit project</div>
              )}
            </div>
          )}
        </motion.div>

        {/* Center note */}
        <div className="text-center mt-4">
          <div className="inline-block bg-white/2 px-3 py-2 rounded-lg text-[#9fb0c8] text-sm">
            IRU BUSINESS GROUP Ltd (center)
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedProject && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-gradient-to-b from-white/3 to-white/2 rounded-2xl p-6 max-w-lg w-full text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2">{selectedProject.id}</h3>
            <p className="text-[#9fb0c8] mb-6">{selectedProject.desc}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-white/6 text-white hover:bg-white/10 transition-colors"
              >
                Close
              </button>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
