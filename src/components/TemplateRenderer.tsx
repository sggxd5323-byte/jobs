import React from 'react';
import { ResumeData } from '../utils/pdfGenerator';
import { getTemplateById } from '../data/resumeTemplates';

interface TemplateRendererProps {
  templateId: string;
  resumeData: ResumeData;
  preview?: boolean;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({ templateId, resumeData, preview = false }) => {
  const template = getTemplateById(templateId);

  if (!template) {
    return <div className="p-8 text-center text-gray-500">Template not found</div>;
  }

  const scale = preview ? 0.4 : 1;
  const fontSize = (size: number) => size * scale;
  const spacing = (space: number) => space * scale;

  const renderTemplate = () => {
    switch (templateId) {
      case 'career-catalyst':
        return renderCareerCatalyst();
      case 'nextstep-profile':
        return renderNextStepProfile();
      case 'visionpath-cv':
        return renderVisionPathCV();
      case 'talentedge-resume':
        return renderTalentEdgeResume();
      case 'futureready-profile':
        return renderFutureReadyProfile();
      case 'projourney-resume':
        return renderProJourneyResume();
      case 'skillsphere-cv':
        return renderSkillSphereCV();
      case 'opportune-profile':
        return renderOpportuneProfile();
      case 'elevatecareer-resume':
        return renderElevateCareerResume();
      case 'growthtrack-cv':
        return renderGrowthTrackCV();
      case 'jobquest-profile':
        return renderJobQuestProfile();
      case 'dreamhire-resume':
        return renderDreamHireResume();
      default:
        return renderCareerCatalyst();
    }
  };

  // CareerCatalyst Resume - Two-column with sidebar
  function renderCareerCatalyst() {
    return (
      <div style={{
        fontFamily: 'Inter, sans-serif',
        maxWidth: preview ? 300 : 800,
        minHeight: preview ? 425 : 1100,
        background: '#FFFFFF',
        display: 'flex',
        margin: '0 auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        borderRadius: spacing(8)
      }}>
        {/* Left Sidebar */}
        <div style={{
          width: '35%',
          background: '#1E3A8A',
          color: 'white',
          padding: spacing(24)
        }}>
          <h1 style={{
            fontSize: fontSize(24),
            fontWeight: 700,
            marginBottom: spacing(8),
            wordBreak: 'break-word'
          }}>
            {resumeData.personalInfo.name || 'Your Name'}
          </h1>
          
          <div style={{ marginBottom: spacing(24), fontSize: fontSize(10) }}>
            {resumeData.personalInfo.email && <div style={{ marginBottom: spacing(8) }}>📧 {resumeData.personalInfo.email}</div>}
            {resumeData.personalInfo.phone && <div style={{ marginBottom: spacing(8) }}>📱 {resumeData.personalInfo.phone}</div>}
            {resumeData.personalInfo.location && <div style={{ marginBottom: spacing(8) }}>📍 {resumeData.personalInfo.location}</div>}
            {resumeData.personalInfo.linkedin && <div style={{ marginBottom: spacing(8) }}>💼 LinkedIn</div>}
            {resumeData.personalInfo.github && <div style={{ marginBottom: spacing(8) }}>🔗 GitHub</div>}
          </div>

          {resumeData.skills.length > 0 && (
            <div>
              <h3 style={{ fontSize: fontSize(14), fontWeight: 600, marginBottom: spacing(12), color: '#F8FAFC' }}>
                SKILLS
              </h3>
              {resumeData.skills.map((skill, index) => (
                <div key={index} style={{
                  fontSize: fontSize(9),
                  marginBottom: spacing(6),
                  padding: spacing(4),
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: spacing(4)
                }}>
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div style={{ flex: 1, padding: spacing(24) }}>
          {resumeData.personalInfo.summary && (
            <section style={{ marginBottom: spacing(24) }}>
              <h2 style={{ fontSize: fontSize(16), fontWeight: 600, color: '#1E3A8A', marginBottom: spacing(12) }}>
                PROFESSIONAL SUMMARY
              </h2>
              <p style={{ fontSize: fontSize(10), lineHeight: 1.5, color: '#374151' }}>
                {resumeData.personalInfo.summary}
              </p>
            </section>
          )}

          {resumeData.experience.length > 0 && (
            <section style={{ marginBottom: spacing(24) }}>
              <h2 style={{ fontSize: fontSize(16), fontWeight: 600, color: '#1E3A8A', marginBottom: spacing(12) }}>
                WORK EXPERIENCE
              </h2>
              {resumeData.experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: spacing(16) }}>
                  <h3 style={{ fontSize: fontSize(12), fontWeight: 600, color: '#1F2937' }}>
                    {exp.title}
                  </h3>
                  <p style={{ fontSize: fontSize(10), color: '#3B82F6', fontWeight: 500, marginBottom: spacing(4) }}>
                    {exp.company} • {exp.duration}
                  </p>
                  <p style={{ fontSize: fontSize(9), color: '#6B7280', lineHeight: 1.4 }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {resumeData.education.length > 0 && (
            <section style={{ marginBottom: spacing(24) }}>
              <h2 style={{ fontSize: fontSize(16), fontWeight: 600, color: '#1E3A8A', marginBottom: spacing(12) }}>
                EDUCATION
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} style={{ marginBottom: spacing(12) }}>
                  <h3 style={{ fontSize: fontSize(11), fontWeight: 600, color: '#1F2937' }}>
                    {edu.degree}
                  </h3>
                  <p style={{ fontSize: fontSize(9), color: '#6B7280' }}>
                    {edu.institution} • {edu.year}{edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </section>
          )}

          {resumeData.projects && resumeData.projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: fontSize(16), fontWeight: 600, color: '#1E3A8A', marginBottom: spacing(12) }}>
                PROJECTS
              </h2>
              {resumeData.projects.map((project, index) => (
                <div key={index} style={{ marginBottom: spacing(16) }}>
                  <h3 style={{ fontSize: fontSize(11), fontWeight: 600, color: '#1F2937' }}>
                    {project.name}
                  </h3>
                  <p style={{ fontSize: fontSize(9), color: '#6B7280', lineHeight: 1.4, marginBottom: spacing(4) }}>
                    {project.description}
                  </p>
                  {project.technologies && (
                    <p style={{ fontSize: fontSize(8), color: '#3B82F6', fontStyle: 'italic' }}>
                      Technologies: {project.technologies}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    );
  }

  // NextStep Profile - Single column
  function renderNextStepProfile() {
    return (
      <div style={{
        fontFamily: 'Poppins, sans-serif',
        maxWidth: preview ? 300 : 800,
        minHeight: preview ? 425 : 1100,
        background: '#FFFFFF',
        padding: spacing(32),
        margin: '0 auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        borderRadius: spacing(8)
      }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: spacing(32), borderBottom: '3px solid #0D9488', paddingBottom: spacing(16) }}>
          <h1 style={{ fontSize: fontSize(32), fontWeight: 700, color: '#0D9488', marginBottom: spacing(8) }}>
            {resumeData.personalInfo.name || 'Your Name'}
          </h1>
          <div style={{ fontSize: fontSize(12), color: '#374151', lineHeight: 1.6 }}>
            {resumeData.personalInfo.email && <div>{resumeData.personalInfo.email}</div>}
            {resumeData.personalInfo.phone && <div>{resumeData.personalInfo.phone}</div>}
            {resumeData.personalInfo.location && <div>{resumeData.personalInfo.location}</div>}
          </div>
        </header>

        {resumeData.personalInfo.summary && (
          <section style={{ marginBottom: spacing(32) }}>
            <h2 style={{ fontSize: fontSize(18), fontWeight: 600, color: '#0D9488', marginBottom: spacing(12) }}>
              PROFESSIONAL SUMMARY
            </h2>
            <p style={{ fontSize: fontSize(11), lineHeight: 1.6, color: '#374151' }}>
              {resumeData.personalInfo.summary}
            </p>
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section style={{ marginBottom: spacing(32) }}>
            <h2 style={{ fontSize: fontSize(18), fontWeight: 600, color: '#0D9488', marginBottom: spacing(16) }}>
              WORK EXPERIENCE
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: spacing(20), paddingLeft: spacing(16), borderLeft: '2px solid #14B8A6' }}>
                <h3 style={{ fontSize: fontSize(14), fontWeight: 600, color: '#1F2937' }}>
                  {exp.title}
                </h3>
                <p style={{ fontSize: fontSize(11), color: '#0D9488', fontWeight: 500, marginBottom: spacing(8) }}>
                  {exp.company} • {exp.duration}
                </p>
                <p style={{ fontSize: fontSize(10), color: '#6B7280', lineHeight: 1.5 }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {resumeData.skills.length > 0 && (
          <section style={{ marginBottom: spacing(32) }}>
            <h2 style={{ fontSize: fontSize(18), fontWeight: 600, color: '#0D9488', marginBottom: spacing(12) }}>
              SKILLS
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing(8) }}>
              {resumeData.skills.map((skill, index) => (
                <span key={index} style={{
                  background: '#0D9488',
                  color: 'white',
                  padding: `${spacing(4)} ${spacing(12)}`,
                  borderRadius: spacing(16),
                  fontSize: fontSize(9),
                  fontWeight: 500
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {resumeData.education.length > 0 && (
          <section style={{ marginBottom: spacing(32) }}>
            <h2 style={{ fontSize: fontSize(18), fontWeight: 600, color: '#0D9488', marginBottom: spacing(16) }}>
              EDUCATION
            </h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: spacing(16) }}>
                <h3 style={{ fontSize: fontSize(12), fontWeight: 600, color: '#1F2937' }}>
                  {edu.degree}
                </h3>
                <p style={{ fontSize: fontSize(10), color: '#6B7280' }}>
                  {edu.institution} • {edu.year}{edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </section>
        )}

        {resumeData.projects && resumeData.projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: fontSize(18), fontWeight: 600, color: '#0D9488', marginBottom: spacing(16) }}>
              PROJECTS
            </h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} style={{ marginBottom: spacing(16) }}>
                <h3 style={{ fontSize: fontSize(12), fontWeight: 600, color: '#1F2937' }}>
                  {project.name}
                </h3>
                <p style={{ fontSize: fontSize(10), color: '#6B7280', lineHeight: 1.5, marginBottom: spacing(4) }}>
                  {project.description}
                </p>
                {project.technologies && (
                  <p style={{ fontSize: fontSize(9), color: '#0D9488', fontStyle: 'italic' }}>
                    Technologies: {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    );
  }

  // VisionPath CV - Executive style with bold header
  function renderVisionPathCV() {
    return (
      <div style={{
        fontFamily: 'Playfair Display, serif',
        maxWidth: preview ? 300 : 800,
        minHeight: preview ? 425 : 1100,
        background: '#F5F5DC',
        margin: '0 auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        borderRadius: spacing(8)
      }}>
        {/* Bold Header */}
        <header style={{
          background: '#064E3B',
          color: 'white',
          padding: spacing(40),
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: fontSize(36), fontWeight: 700, marginBottom: spacing(12) }}>
            {resumeData.personalInfo.name || 'Your Name'}
          </h1>
          <p style={{ fontSize: fontSize(16), opacity: 0.9, marginBottom: spacing(16) }}>
            Executive Professional
          </p>
          <div style={{ fontSize: fontSize(12), lineHeight: 1.6 }}>
            {resumeData.personalInfo.email && <div>{resumeData.personalInfo.email}</div>}
            {resumeData.personalInfo.phone && <div>{resumeData.personalInfo.phone}</div>}
            {resumeData.personalInfo.location && <div>{resumeData.personalInfo.location}</div>}
          </div>
        </header>

        {/* Two-column content */}
        <div style={{ display: 'flex', padding: spacing(32) }}>
          <div style={{ flex: 2, paddingRight: spacing(24) }}>
            {resumeData.personalInfo.summary && (
              <section style={{ marginBottom: spacing(32) }}>
                <h2 style={{ fontSize: fontSize(18), fontWeight: 600, color: '#064E3B', marginBottom: spacing(12), borderBottom: '2px solid #059669', paddingBottom: spacing(4) }}>
                  EXECUTIVE SUMMARY
                </h2>
                <p style={{ fontSize: fontSize(11), lineHeight: 1.6, color: '#1F2937' }}>
                  {resumeData.personalInfo.summary}
                </p>
              </section>
            )}

            {resumeData.experience.length > 0 && (
              <section>
                <h2 style={{ fontSize: fontSize(18), fontWeight: 600, color: '#064E3B', marginBottom: spacing(16), borderBottom: '2px solid #059669', paddingBottom: spacing(4) }}>
                  PROFESSIONAL EXPERIENCE
                </h2>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} style={{ marginBottom: spacing(24), paddingLeft: spacing(16), borderLeft: '3px solid #10B981' }}>
                    <h3 style={{ fontSize: fontSize(14), fontWeight: 600, color: '#064E3B' }}>
                      {exp.title}
                    </h3>
                    <p style={{ fontSize: fontSize(11), color: '#059669', fontWeight: 500, marginBottom: spacing(8) }}>
                      {exp.company} • {exp.duration}
                    </p>
                    <p style={{ fontSize: fontSize(10), color: '#374151', lineHeight: 1.5 }}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </section>
            )}
          </div>

          <div style={{ flex: 1 }}>
            {resumeData.education.length > 0 && (
              <section style={{ marginBottom: spacing(32) }}>
                <h2 style={{ fontSize: fontSize(16), fontWeight: 600, color: '#064E3B', marginBottom: spacing(12) }}>
                  EDUCATION
                </h2>
                {resumeData.education.map((edu, index) => (
                  <div key={index} style={{ marginBottom: spacing(16) }}>
                    <h3 style={{ fontSize: fontSize(11), fontWeight: 600, color: '#1F2937' }}>
                      {edu.degree}
                    </h3>
                    <p style={{ fontSize: fontSize(9), color: '#6B7280' }}>
                      {edu.institution}
                    </p>
                    <p style={{ fontSize: fontSize(9), color: '#6B7280' }}>
                      {edu.year}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {resumeData.projects && resumeData.projects.length > 0 && (
              <section>
                <h2 style={{ fontSize: fontSize(16), fontWeight: 600, color: '#064E3B', marginBottom: spacing(12) }}>
                  KEY PROJECTS
                </h2>
                {resumeData.projects.map((project, index) => (
                  <div key={index} style={{ marginBottom: spacing(16) }}>
                    <h3 style={{ fontSize: fontSize(10), fontWeight: 600, color: '#1F2937' }}>
                      {project.name}
                    </h3>
                    <p style={{ fontSize: fontSize(8), color: '#6B7280', lineHeight: 1.4 }}>
                      {project.description}
                    </p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // TalentEdge Resume - Modern card-style
  function renderTalentEdgeResume() {
    return (
      <div style={{
        fontFamily: 'Inter, sans-serif',
        maxWidth: preview ? 300 : 800,
        minHeight: preview ? 425 : 1100,
        background: '#F1F5F9',
        padding: spacing(24),
        margin: '0 auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        borderRadius: spacing(12)
      }}>
        {/* Header Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
          color: 'white',
          padding: spacing(32),
          borderRadius: spacing(16),
          marginBottom: spacing(24),
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: fontSize(28), fontWeight: 700, marginBottom: spacing(8) }}>
            {resumeData.personalInfo.name || 'Your Name'}
          </h1>
          <p style={{ fontSize: fontSize(14), opacity: 0.9, marginBottom: spacing(16) }}>
            {resumeData.experience[0]?.title || 'Professional'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: spacing(16), flexWrap: 'wrap', fontSize: fontSize(10) }}>
            {resumeData.personalInfo.email && <span>📧 {resumeData.personalInfo.email}</span>}
            {resumeData.personalInfo.phone && <span>📱 {resumeData.personalInfo.phone}</span>}
            {resumeData.personalInfo.location && <span>📍 {resumeData.personalInfo.location}</span>}
          </div>
        </div>

        {/* Content Cards */}
        {resumeData.personalInfo.summary && (
          <div style={{
            background: 'white',
            padding: spacing(24),
            borderRadius: spacing(12),
            marginBottom: spacing(16),
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ fontSize: fontSize(16), fontWeight: 600, color: '#1E40AF', marginBottom: spacing(12) }}>
              PROFESSIONAL SUMMARY
            </h2>
            <p style={{ fontSize: fontSize(11), lineHeight: 1.6, color: '#374151' }}>
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}

        {resumeData.experience.length > 0 && (
          <div style={{
            background: 'white',
            padding: spacing(24),
            borderRadius: spacing(12),
            marginBottom: spacing(16),
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ fontSize: fontSize(16), fontWeight: 600, color: '#1E40AF', marginBottom: spacing(16) }}>
              WORK EXPERIENCE
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: spacing(20), paddingBottom: spacing(16), borderBottom: index < resumeData.experience.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
                <h3 style={{ fontSize: fontSize(13), fontWeight: 600, color: '#1F2937' }}>
                  {exp.title}
                </h3>
                <p style={{ fontSize: fontSize(11), color: '#3B82F6', fontWeight: 500, marginBottom: spacing(8) }}>
                  {exp.company} • {exp.duration}
                </p>
                <p style={{ fontSize: fontSize(10), color: '#6B7280', lineHeight: 1.5 }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: spacing(16) }}>
          {resumeData.skills.length > 0 && (
            <div style={{
              flex: 1,
              background: 'white',
              padding: spacing(24),
              borderRadius: spacing(12),
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{ fontSize: fontSize(16), fontWeight: 600, color: '#1E40AF', marginBottom: spacing(12) }}>
                SKILLS
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing(6) }}>
                {resumeData.skills.map((skill, index) => (
                  <span key={index} style={{
                    background: '#60A5FA',
                    color: 'white',
                    padding: `${spacing(4)} ${spacing(8)}`,
                    borderRadius: spacing(12),
                    fontSize: fontSize(8),
                    fontWeight: 500
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {resumeData.education.length > 0 && (
            <div style={{
              flex: 1,
              background: 'white',
              padding: spacing(24),
              borderRadius: spacing(12),
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{ fontSize: fontSize(16), fontWeight: 600, color: '#1E40AF', marginBottom: spacing(12) }}>
                EDUCATION
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} style={{ marginBottom: spacing(12) }}>
                  <h3 style={{ fontSize: fontSize(10), fontWeight: 600, color: '#1F2937' }}>
                    {edu.degree}
                  </h3>
                  <p style={{ fontSize: fontSize(9), color: '#6B7280' }}>
                    {edu.institution}
                  </p>
                  <p style={{ fontSize: fontSize(9), color: '#6B7280' }}>
                    {edu.year}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Add more template renderers for the remaining templates...
  function renderFutureReadyProfile() {
    return renderNextStepProfile(); // Placeholder - implement unique design
  }

  function renderProJourneyResume() {
    return renderTalentEdgeResume(); // Placeholder - implement unique design
  }

  function renderSkillSphereCV() {
    return renderCareerCatalyst(); // Placeholder - implement unique design
  }

  function renderOpportuneProfile() {
    return renderNextStepProfile(); // Placeholder - implement unique design
  }

  function renderElevateCareerResume() {
    return renderTalentEdgeResume(); // Placeholder - implement unique design
  }

  function renderGrowthTrackCV() {
    return renderCareerCatalyst(); // Placeholder - implement unique design
  }

  function renderJobQuestProfile() {
    return renderNextStepProfile(); // Placeholder - implement unique design
  }

  function renderDreamHireResume() {
    return renderTalentEdgeResume(); // Placeholder - implement unique design
  }

  return (
    <div className={`template-renderer ${preview ? 'preview-mode' : ''}`}>
      {renderTemplate()}
    </div>
  );
};

export default TemplateRenderer;