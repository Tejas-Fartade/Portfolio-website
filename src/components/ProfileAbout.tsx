import React, { useState } from 'react';
import { personalDetails } from '../data/resumeData';
import { MapPin, Clock, Mail, Phone, GraduationCap, Target, ChevronRight } from 'lucide-react';

const icons: Record<string, React.ReactNode> = {
  Location:     <MapPin  className="w-3.5 h-3.5 shrink-0" />,
  Availability: <Clock   className="w-3.5 h-3.5 shrink-0" />,
  Email:        <Mail    className="w-3.5 h-3.5 shrink-0" />,
  Phone:        <Phone   className="w-3.5 h-3.5 shrink-0" />,
};

export const ProfileAbout: React.FC = () => {
  const [hoveredRow, setHoveredRow]     = useState<string | null>(null);
  const [hoveredLearn, setHoveredLearn] = useState<number | null>(null);
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null);

  const contactRows = [
    { label: 'Location',     value: personalDetails.location,          accent: false, link: null },
    { label: 'Availability', value: '3-Month Cybersecurity Internship', accent: true,  link: null },
    { label: 'Email',        value: personalDetails.email,             accent: false, link: `mailto:${personalDetails.email}` },
    { label: 'Phone',        value: `+91 ${personalDetails.phone}`,    accent: false, link: `tel:${personalDetails.phone}` },
  ];

  return (
    <section id="about" className="bg-[#06060f] border-t border-[#1a1a3a]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-24 space-y-20">

        {/* Section label */}
        <div className="section-num group cursor-default select-none">
          <span className="transition-colors duration-200 group-hover:text-[#4f8ef7]">
            [ 02 / 08 ] — PROFILE
          </span>
        </div>

        {/* ── Headline + contact rows ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Headline */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] uppercase select-none">
              <span className="text-white inline-block transition-colors duration-200 hover:text-[#4f8ef7] cursor-default">
                About
              </span>
              <br />
              <span className="text-[#4f8ef7] inline-block transition-all duration-200 hover:text-white hover:tracking-widest cursor-default">
                Tejas
              </span>
              <br />
              <span className="text-white inline-block transition-colors duration-200 hover:text-[#7c5cfc] cursor-default">
                Fartade.
              </span>
            </h2>
          </div>

          {/* Right col */}
          <div className="lg:col-span-5 space-y-8 pt-2">

            {/* Bio text */}
            <p className="text-[#6b6b9a] text-sm leading-relaxed transition-colors duration-300 hover:text-[#9a9abf] cursor-default">
              {personalDetails.profileSummary}
            </p>

            {/* Contact rows */}
            <div className="border-t border-[#1a1a3a] pt-6 space-y-1 font-mono text-xs">
              {contactRows.map(item => (
                <div
                  key={item.label}
                  onMouseEnter={() => setHoveredRow(item.label)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`flex items-center justify-between gap-4 py-3 px-3 border-b border-[#0e0e22] transition-all duration-200 rounded-sm ${
                    hoveredRow === item.label
                      ? 'bg-[#0e0e22] border-b-[#1a1a3a]'
                      : ''
                  }`}
                >
                  {/* Label + icon */}
                  <div className={`flex items-center gap-2 uppercase tracking-widest transition-colors duration-200 ${
                    hoveredRow === item.label ? 'text-[#4f8ef7]' : 'text-[#3a3a60]'
                  }`}>
                    {icons[item.label]}
                    {item.label}
                  </div>

                  {/* Value */}
                  {item.link ? (
                    <a
                      href={item.link}
                      className={`text-right transition-all duration-200 flex items-center gap-1 ${
                        hoveredRow === item.label
                          ? 'text-white underline underline-offset-2'
                          : 'text-[#4f8ef7]'
                      }`}
                    >
                      {item.value}
                      <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
                        hoveredRow === item.label ? 'translate-x-0.5' : ''
                      }`} />
                    </a>
                  ) : (
                    <span className={`text-right transition-colors duration-200 ${
                      item.accent
                        ? hoveredRow === item.label ? 'text-white' : 'text-[#4f8ef7]'
                        : hoveredRow === item.label ? 'text-white' : 'text-[#e8e8f0]'
                    }`}>
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Objective + Education panels ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#1a1a3a]">

          {/* Career Objective */}
          <div
            onMouseEnter={() => setHoveredPanel('objective')}
            onMouseLeave={() => setHoveredPanel(null)}
            className={`p-10 border-b lg:border-b-0 lg:border-r border-[#1a1a3a] space-y-4 transition-colors duration-300 ${
              hoveredPanel === 'objective' ? 'bg-[#0a0a18]' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <Target className={`w-4 h-4 transition-colors duration-200 ${
                hoveredPanel === 'objective' ? 'text-[#4f8ef7]' : 'text-[#3a3a60]'
              }`} />
              <span className={`section-num transition-colors duration-200 ${
                hoveredPanel === 'objective' ? 'text-[#4f8ef7]' : ''
              }`}>
                CAREER OBJECTIVE
              </span>
            </div>
            <p className={`text-sm leading-relaxed mt-4 transition-colors duration-300 cursor-default ${
              hoveredPanel === 'objective' ? 'text-[#9a9abf]' : 'text-[#6b6b9a]'
            }`}>
              "{personalDetails.careerObjective}"
            </p>
          </div>

          {/* Education */}
          <div
            onMouseEnter={() => setHoveredPanel('education')}
            onMouseLeave={() => setHoveredPanel(null)}
            className={`p-10 space-y-4 transition-colors duration-300 ${
              hoveredPanel === 'education' ? 'bg-[#0a0a18]' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className={`w-4 h-4 transition-colors duration-200 ${
                hoveredPanel === 'education' ? 'text-[#7c5cfc]' : 'text-[#3a3a60]'
              }`} />
              <span className={`section-num transition-colors duration-200 ${
                hoveredPanel === 'education' ? 'text-[#7c5cfc]' : ''
              }`}>
                EDUCATION
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className={`font-display text-2xl uppercase transition-colors duration-200 cursor-default ${
                hoveredPanel === 'education' ? 'text-[#4f8ef7]' : 'text-white'
              }`}>
                {personalDetails.education.degree}
              </div>
              <div className={`font-mono text-xs transition-colors duration-200 cursor-default ${
                hoveredPanel === 'education' ? 'text-[#9a9abf]' : 'text-[#6b6b9a]'
              }`}>
                {personalDetails.education.institution}
              </div>
              <div className={`font-mono text-xs uppercase tracking-wider mt-2 transition-colors duration-200 cursor-default ${
                hoveredPanel === 'education' ? 'text-white' : 'text-[#4f8ef7]'
              }`}>
                Expected {personalDetails.education.expectedYear}
              </div>
            </div>

            {/* Additional Learning */}
            <div className="mt-6 space-y-2">
              <span className="section-num">Additional Learning</span>
              <ul className="mt-3 space-y-1">
                {personalDetails.additionalLearning.map((item, i) => (
                  <li
                    key={i}
                    onMouseEnter={() => setHoveredLearn(i)}
                    onMouseLeave={() => setHoveredLearn(null)}
                    className={`flex items-start gap-3 font-mono text-xs py-2 px-2 rounded-sm transition-all duration-200 cursor-default ${
                      hoveredLearn === i
                        ? 'bg-[#0e0e22] text-[#e8e8f0]'
                        : 'text-[#6b6b9a]'
                    }`}
                  >
                    <span className={`mt-0.5 transition-colors duration-200 font-bold ${
                      hoveredLearn === i ? 'text-[#7c5cfc]' : 'text-[#4f8ef7]'
                    }`}>
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
