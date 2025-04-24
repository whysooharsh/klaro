import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Emily Chen',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Maria Garcia',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
    
      <div className="relative bg-indigo-600 py-24">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-20"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Fashion background"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/1350x800/f5f5f5/333333?text=Fashion+Background";
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              Our Story
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
              We are passionate about bringing you the latest fashion trends while maintaining quality and sustainability.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              To empower women through fashion by providing high-quality, sustainable clothing that makes them feel confident and beautiful.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900">
              Our Values
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Sustainability',
                  description: 'We are committed to eco-friendly practices and sustainable materials.'
                },
                {
                  title: 'Quality',
                  description: 'Every piece is crafted with attention to detail and premium materials.'
                },
                {
                  title: 'Innovation',
                  description: 'We constantly evolve to bring you the latest trends and styles.'
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-medium text-gray-900">{value.title}</h3>
                  <p className="mt-2 text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900">
              Meet Our Team
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/128x128/f5f5f5/333333?text=${encodeURIComponent(member.name[0])}`;
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About; 