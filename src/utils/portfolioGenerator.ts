export interface PortfolioData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin: string;
    github: string;
  };
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    link?: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
}

export const generateGitHubPages = (data: PortfolioData, template: string = 'modern'): string => {
  const templates = {
    modern: generateModernTemplate(data),
    creative: generateCreativeTemplate(data),
    developer: generateDeveloperTemplate(data)
  };

  return templates[template as keyof typeof templates] || templates.modern;
};

export const downloadPortfolio = (data: PortfolioData, template: string = 'modern'): void => {
  const htmlContent = generateGitHubPages(data, template);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(data.personalInfo.name || 'portfolio').replace(/\s+/g, '-').toLowerCase()}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

function generateModernTemplate(data: PortfolioData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name || 'Portfolio'} - Professional Portfolio</title>
    <meta name="description" content="Professional portfolio of ${data.personalInfo.name || 'Professional'} - ${data.personalInfo.summary || 'Experienced professional'}">
    <meta name="keywords" content="${data.skills.join(', ')}, portfolio, professional">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .portfolio-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            animation: fadeInUp 1s ease-out;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }
        
        .header-content {
            position: relative;
            z-index: 2;
        }
        
        .name {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            animation: slideInDown 1s ease-out 0.5s both;
        }
        
        .title {
            font-size: 1.5rem;
            opacity: 0.9;
            margin-bottom: 1rem;
            animation: slideInDown 1s ease-out 0.7s both;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
            margin-top: 1rem;
            animation: slideInUp 1s ease-out 0.9s both;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem;
            border-radius: 25px;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
        }
        
        .contact-item:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
        
        .content {
            padding: 3rem 2rem;
        }
        
        .section {
            margin-bottom: 3rem;
            animation: fadeInUp 1s ease-out;
        }
        
        .section-title {
            font-size: 2rem;
            font-weight: 600;
            color: #667eea;
            margin-bottom: 1.5rem;
            position: relative;
            padding-bottom: 0.5rem;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 2px;
        }
        
        .summary {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #555;
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 15px;
            border-left: 4px solid #667eea;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
        }
        
        .skill-item {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 25px;
            text-align: center;
            font-weight: 500;
            transition: all 0.3s ease;
            animation: scaleIn 0.5s ease-out;
        }
        
        .skill-item:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        .experience-item, .project-item, .education-item {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            margin-bottom: 1.5rem;
            border-left: 4px solid #667eea;
            transition: all 0.3s ease;
        }
        
        .experience-item:hover, .project-item:hover, .education-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .item-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 0.5rem;
        }
        
        .item-subtitle {
            font-size: 1rem;
            color: #667eea;
            font-weight: 500;
            margin-bottom: 1rem;
        }
        
        .item-description {
            color: #666;
            line-height: 1.6;
        }
        
        .footer {
            background: #2d3748;
            color: white;
            text-align: center;
            padding: 2rem;
            margin-top: 3rem;
        }
        
        .footer-content {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .footer-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #667eea;
        }
        
        .footer-text {
            margin-bottom: 1.5rem;
            opacity: 0.9;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 1.5rem;
        }
        
        .footer-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .footer-link:hover {
            color: #764ba2;
            transform: translateY(-2px);
        }
        
        .footer-bottom {
            border-top: 1px solid #4a5568;
            padding-top: 1rem;
            margin-top: 1rem;
            opacity: 0.7;
            font-size: 0.9rem;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
            
            .name {
                font-size: 2rem;
            }
            
            .contact-info {
                flex-direction: column;
                gap: 1rem;
            }
            
            .content {
                padding: 2rem 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="portfolio-card">
            <header class="header">
                <div class="header-content">
                    <h1 class="name">${data.personalInfo.name || 'Your Name'}</h1>
                    <p class="title">${data.experience[0]?.title || 'Professional'}</p>
                    <div class="contact-info">
                        ${data.personalInfo.email ? `<div class="contact-item">📧 ${data.personalInfo.email}</div>` : ''}
                        ${data.personalInfo.phone ? `<div class="contact-item">📱 ${data.personalInfo.phone}</div>` : ''}
                        ${data.personalInfo.location ? `<div class="contact-item">📍 ${data.personalInfo.location}</div>` : ''}
                        ${data.personalInfo.linkedin ? `<div class="contact-item"><a href="${data.personalInfo.linkedin}" style="color: inherit; text-decoration: none;">💼 LinkedIn</a></div>` : ''}
                        ${data.personalInfo.github ? `<div class="contact-item"><a href="${data.personalInfo.github}" style="color: inherit; text-decoration: none;">🔗 GitHub</a></div>` : ''}
                    </div>
                </div>
            </header>
            
            <main class="content">
                ${data.personalInfo.summary ? `
                <section class="section">
                    <h2 class="section-title">About Me</h2>
                    <div class="summary">${data.personalInfo.summary}</div>
                </section>
                ` : ''}
                
                ${data.skills.length > 0 ? `
                <section class="section">
                    <h2 class="section-title">Skills & Technologies</h2>
                    <div class="skills-grid">
                        ${data.skills.map(skill => `<div class="skill-item">${skill}</div>`).join('')}
                    </div>
                </section>
                ` : ''}
                
                ${data.experience.length > 0 ? `
                <section class="section">
                    <h2 class="section-title">Work Experience</h2>
                    ${data.experience.map(exp => `
                        <div class="experience-item">
                            <h3 class="item-title">${exp.title}</h3>
                            <p class="item-subtitle">${exp.company} • ${exp.duration}</p>
                            <p class="item-description">${exp.description}</p>
                        </div>
                    `).join('')}
                </section>
                ` : ''}
                
                ${data.projects && data.projects.length > 0 ? `
                <section class="section">
                    <h2 class="section-title">Featured Projects</h2>
                    ${data.projects.map(project => `
                        <div class="project-item">
                            <h3 class="item-title">${project.name}</h3>
                            <p class="item-subtitle">${project.technologies}</p>
                            <p class="item-description">${project.description}</p>
                            ${project.link ? `<a href="${project.link}" style="color: #667eea; font-weight: 500; text-decoration: none;">🔗 View Project</a>` : ''}
                        </div>
                    `).join('')}
                </section>
                ` : ''}
                
                ${data.education.length > 0 ? `
                <section class="section">
                    <h2 class="section-title">Education</h2>
                    ${data.education.map(edu => `
                        <div class="education-item">
                            <h3 class="item-title">${edu.degree}</h3>
                            <p class="item-subtitle">${edu.institution} • ${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                        </div>
                    `).join('')}
                </section>
                ` : ''}
            </main>
        </div>
    </div>
    
    <footer class="footer">
        <div class="footer-content">
            <h3 class="footer-title">Let's Connect</h3>
            <p class="footer-text">
                I'm always interested in new opportunities and collaborations. 
                Feel free to reach out if you'd like to work together!
            </p>
            <div class="footer-links">
                ${data.personalInfo.email ? `<a href="mailto:${data.personalInfo.email}" class="footer-link">Email Me</a>` : ''}
                ${data.personalInfo.linkedin ? `<a href="${data.personalInfo.linkedin}" class="footer-link" target="_blank">LinkedIn</a>` : ''}
                ${data.personalInfo.github ? `<a href="${data.personalInfo.github}" class="footer-link" target="_blank">GitHub</a>` : ''}
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} ${data.personalInfo.name || 'Portfolio'}. Built with CareerPanda.</p>
                <p>Last updated: ${new Date().toLocaleDateString()}</p>
            </div>
        </div>
    </footer>
    
    <script>
        // Add smooth scrolling and animations
        document.addEventListener('DOMContentLoaded', function() {
            // Animate elements on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('.section').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'all 0.6s ease-out';
                observer.observe(section);
            });
            
            // Add hover effects to skill items
            document.querySelectorAll('.skill-item').forEach((item, index) => {
                item.style.animationDelay = (index * 0.1) + 's';
            });
        });
    </script>
</body>
</html>`;
}

function generateCreativeTemplate(data: PortfolioData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name || 'Portfolio'} - Creative Portfolio</title>
    <meta name="description" content="Creative portfolio of ${data.personalInfo.name || 'Creative Professional'} - ${data.personalInfo.summary || 'Creative professional'}">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .creative-header {
            text-align: center;
            padding: 4rem 2rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 30px;
            margin-bottom: 3rem;
            position: relative;
            overflow: hidden;
        }
        
        .creative-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent);
            animation: rotate 10s linear infinite;
        }
        
        .header-content {
            position: relative;
            z-index: 2;
        }
        
        .creative-name {
            font-size: 4rem;
            font-weight: 700;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
            animation: textGlow 3s ease-in-out infinite alternate;
        }
        
        .creative-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .creative-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .creative-card:hover {
            transform: translateY(-10px) rotate(1deg);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        }
        
        .card-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            display: block;
        }
        
        .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #333;
        }
        
        .footer {
            background: rgba(0, 0, 0, 0.8);
            color: white;
            text-align: center;
            padding: 3rem 2rem;
            margin-top: 4rem;
            border-radius: 20px;
            backdrop-filter: blur(10px);
        }
        
        .footer-title {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin: 2rem 0;
        }
        
        .footer-link {
            color: #4ecdc4;
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border: 2px solid #4ecdc4;
            border-radius: 25px;
            transition: all 0.3s ease;
        }
        
        .footer-link:hover {
            background: #4ecdc4;
            color: white;
            transform: scale(1.1);
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes textGlow {
            from { filter: drop-shadow(0 0 10px rgba(255, 107, 107, 0.5)); }
            to { filter: drop-shadow(0 0 20px rgba(78, 205, 196, 0.5)); }
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .creative-name {
                font-size: 2.5rem;
            }
            
            .creative-grid {
                grid-template-columns: 1fr;
            }
            
            .footer-links {
                flex-direction: column;
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="creative-header">
            <div class="header-content">
                <h1 class="creative-name">${data.personalInfo.name || 'Creative Professional'}</h1>
                <p style="font-size: 1.2rem; color: rgba(255,255,255,0.9);">${data.personalInfo.summary || 'Creative Professional & Innovator'}</p>
            </div>
        </header>
        
        <main class="creative-grid">
            ${data.skills.length > 0 ? `
            <div class="creative-card">
                <span class="card-icon">🎨</span>
                <h2 class="card-title">Creative Skills</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${data.skills.map(skill => `<span style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem;">${skill}</span>`).join('')}
                </div>
            </div>
            ` : ''}
            
            ${data.experience.length > 0 ? `
            <div class="creative-card">
                <span class="card-icon">💼</span>
                <h2 class="card-title">Experience</h2>
                ${data.experience.map(exp => `
                    <div style="margin-bottom: 1.5rem;">
                        <h3 style="color: #ff6b6b; font-weight: 600;">${exp.title}</h3>
                        <p style="color: #4ecdc4; font-weight: 500;">${exp.company} • ${exp.duration}</p>
                        <p style="color: #666; margin-top: 0.5rem;">${exp.description}</p>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.projects && data.projects.length > 0 ? `
            <div class="creative-card">
                <span class="card-icon">🚀</span>
                <h2 class="card-title">Featured Projects</h2>
                ${data.projects.map(project => `
                    <div style="margin-bottom: 1.5rem;">
                        <h3 style="color: #45b7d1; font-weight: 600;">${project.name}</h3>
                        <p style="color: #96ceb4; font-weight: 500;">${project.technologies}</p>
                        <p style="color: #666; margin-top: 0.5rem;">${project.description}</p>
                        ${project.link ? `<a href="${project.link}" style="color: #ff6b6b; font-weight: 500;">🔗 View Project</a>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.education.length > 0 ? `
            <div class="creative-card">
                <span class="card-icon">🎓</span>
                <h2 class="card-title">Education</h2>
                ${data.education.map(edu => `
                    <div style="margin-bottom: 1rem;">
                        <h3 style="color: #ffeaa7; font-weight: 600;">${edu.degree}</h3>
                        <p style="color: #666;">${edu.institution} • ${edu.year}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </main>
    </div>
    
    <footer class="footer">
        <h3 class="footer-title">Ready to Create Something Amazing?</h3>
        <p style="margin-bottom: 2rem; opacity: 0.9;">
            Let's collaborate and bring your ideas to life. I'm always excited about new creative challenges!
        </p>
        <div class="footer-links">
            ${data.personalInfo.email ? `<a href="mailto:${data.personalInfo.email}" class="footer-link">Get In Touch</a>` : ''}
            ${data.personalInfo.linkedin ? `<a href="${data.personalInfo.linkedin}" class="footer-link" target="_blank">LinkedIn</a>` : ''}
            ${data.personalInfo.github ? `<a href="${data.personalInfo.github}" class="footer-link" target="_blank">GitHub</a>` : ''}
        </div>
        <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 1rem; margin-top: 2rem; opacity: 0.7;">
            <p>&copy; ${new Date().getFullYear()} ${data.personalInfo.name || 'Creative Portfolio'}. Designed with passion.</p>
            <p>Built with CareerPanda • Last updated: ${new Date().toLocaleDateString()}</p>
        </div>
    </footer>
</body>
</html>`;
}

function generateDeveloperTemplate(data: PortfolioData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name || 'Portfolio'} - Developer Portfolio</title>
    <meta name="description" content="Developer portfolio of ${data.personalInfo.name || 'Software Developer'} - ${data.personalInfo.summary || 'Experienced developer'}">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: #0a0a0a;
            color: #e0e0e0;
            line-height: 1.6;
            min-height: 100vh;
        }
        
        .terminal-bg {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            min-height: 100vh;
            position: relative;
        }
        
        .terminal-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 25% 25%, #00ff87 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, #0066ff 0%, transparent 50%);
            opacity: 0.1;
            animation: pulse 4s ease-in-out infinite alternate;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            position: relative;
            z-index: 1;
        }
        
        .terminal-header {
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00ff87;
            border-radius: 10px;
            padding: 1rem;
            margin-bottom: 2rem;
            font-family: 'JetBrains Mono', monospace;
            box-shadow: 0 0 20px rgba(0, 255, 135, 0.3);
        }
        
        .terminal-line {
            margin-bottom: 0.5rem;
            animation: typewriter 2s steps(40) 1s both;
        }
        
        .prompt {
            color: #00ff87;
        }
        
        .command {
            color: #66d9ef;
        }
        
        .output {
            color: #f8f8f2;
        }
        
        .dev-name {
            font-size: 3rem;
            font-weight: 700;
            color: #00ff87;
            text-align: center;
            margin: 2rem 0;
            font-family: 'JetBrains Mono', monospace;
            text-shadow: 0 0 10px rgba(0, 255, 135, 0.5);
            animation: glow 2s ease-in-out infinite alternate;
        }
        
        .code-section {
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #333;
            border-radius: 10px;
            padding: 2rem;
            margin-bottom: 2rem;
            font-family: 'JetBrains Mono', monospace;
            position: relative;
            overflow: hidden;
        }
        
        .code-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: #333;
            border-bottom: 1px solid #555;
        }
        
        .code-section::after {
            content: '● ● ●';
            position: absolute;
            top: 8px;
            left: 15px;
            color: #ff5f56;
            font-size: 12px;
        }
        
        .section-title {
            color: #66d9ef;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            margin-top: 1rem;
        }
        
        .section-title::before {
            content: '// ';
            color: #75715e;
        }
        
        .code-block {
            background: #1e1e1e;
            border-left: 3px solid #00ff87;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 5px;
            overflow-x: auto;
        }
        
        .skill-tag {
            display: inline-block;
            background: linear-gradient(45deg, #00ff87, #0066ff);
            color: #000;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            margin: 0.2rem;
            font-size: 0.9rem;
            font-weight: 500;
            animation: float 3s ease-in-out infinite;
        }
        
        .project-card {
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00ff87;
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            transition: all 0.3s ease;
        }
        
        .project-card:hover {
            border-color: #0066ff;
            box-shadow: 0 0 20px rgba(0, 102, 255, 0.3);
            transform: translateX(10px);
        }
        
        .footer {
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #00ff87;
            border-radius: 15px;
            padding: 3rem 2rem;
            margin-top: 3rem;
            text-align: center;
            font-family: 'JetBrains Mono', monospace;
        }
        
        .footer-title {
            color: #00ff87;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin: 2rem 0;
        }
        
        .footer-link {
            color: #66d9ef;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border: 1px solid #66d9ef;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        
        .footer-link:hover {
            background: #66d9ef;
            color: #000;
        }
        
        @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
        }
        
        @keyframes glow {
            from { text-shadow: 0 0 10px rgba(0, 255, 135, 0.5); }
            to { text-shadow: 0 0 20px rgba(0, 255, 135, 0.8), 0 0 30px rgba(0, 255, 135, 0.3); }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse {
            from { opacity: 0.1; }
            to { opacity: 0.3; }
        }
        
        @media (max-width: 768px) {
            .dev-name {
                font-size: 2rem;
            }
            
            .container {
                padding: 1rem;
            }
            
            .footer-links {
                flex-direction: column;
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="terminal-bg">
        <div class="container">
            <div class="terminal-header">
                <div class="terminal-line">
                    <span class="prompt">developer@portfolio:~$</span> 
                    <span class="command">whoami</span>
                </div>
                <div class="terminal-line">
                    <span class="output">${data.personalInfo.name || 'Software Developer'}</span>
                </div>
                <div class="terminal-line">
                    <span class="prompt">developer@portfolio:~$</span> 
                    <span class="command">cat about.txt</span>
                </div>
                <div class="terminal-line">
                    <span class="output">${data.personalInfo.summary || 'Passionate developer building the future with code'}</span>
                </div>
            </div>
            
            <h1 class="dev-name">${data.personalInfo.name || 'Developer'}</h1>
            
            ${data.skills.length > 0 ? `
            <div class="code-section">
                <div class="section-title">Technical Skills</div>
                <div class="code-block">
                    <div style="color: #f92672;">const</div> 
                    <div style="color: #a6e22e;">skills</div> 
                    <div style="color: #f8f8f2;">= [</div>
                    ${data.skills.map(skill => `<div style="margin-left: 2rem; color: #e6db74;">'${skill}',</div>`).join('')}
                    <div style="color: #f8f8f2;">];</div>
                </div>
            </div>
            ` : ''}
            
            ${data.experience.length > 0 ? `
            <div class="code-section">
                <div class="section-title">Work Experience</div>
                ${data.experience.map(exp => `
                    <div class="code-block">
                        <div style="color: #66d9ef;">class</div> 
                        <div style="color: #a6e22e;">${exp.title.replace(/\s+/g, '')}</div> 
                        <div style="color: #f8f8f2;">{</div>
                        <div style="margin-left: 2rem; color: #f8f8f2;">company: <span style="color: #e6db74;">'${exp.company}'</span>,</div>
                        <div style="margin-left: 2rem; color: #f8f8f2;">duration: <span style="color: #e6db74;">'${exp.duration}'</span>,</div>
                        <div style="margin-left: 2rem; color: #f8f8f2;">description: <span style="color: #e6db74;">'${exp.description}'</span></div>
                        <div style="color: #f8f8f2;">}</div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.projects && data.projects.length > 0 ? `
            <div class="code-section">
                <div class="section-title">Featured Projects</div>
                ${data.projects.map(project => `
                    <div class="project-card">
                        <h3 style="color: #00ff87; font-size: 1.2rem; margin-bottom: 0.5rem;">${project.name}</h3>
                        <p style="color: #66d9ef; margin-bottom: 0.5rem;">Tech Stack: ${project.technologies}</p>
                        <p style="color: #f8f8f2; margin-bottom: 1rem;">${project.description}</p>
                        ${project.link ? `<a href="${project.link}" style="color: #00ff87; text-decoration: none;">→ View Code</a>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
        
        <footer class="footer">
            <div class="terminal-line">
                <span class="prompt">developer@portfolio:~$</span> 
                <span class="command">echo "Let's build something amazing together!"</span>
            </div>
            <h3 class="footer-title">// Ready to Collaborate</h3>
            <p style="margin: 1rem 0; opacity: 0.9;">
                Always excited about new projects and opportunities. Let's connect and create something extraordinary!
            </p>
            <div class="footer-links">
                ${data.personalInfo.email ? `<a href="mailto:${data.personalInfo.email}" class="footer-link">Email</a>` : ''}
                ${data.personalInfo.linkedin ? `<a href="${data.personalInfo.linkedin}" class="footer-link" target="_blank">LinkedIn</a>` : ''}
                ${data.personalInfo.github ? `<a href="${data.personalInfo.github}" class="footer-link" target="_blank">GitHub</a>` : ''}
            </div>
            <div style="border-top: 1px solid #333; padding-top: 1rem; margin-top: 2rem; opacity: 0.7;">
                <p>&copy; ${new Date().getFullYear()} ${data.personalInfo.name || 'Developer Portfolio'}. Coded with ❤️</p>
                <p>Built with CareerPanda • Last commit: ${new Date().toLocaleDateString()}</p>
            </div>
        </footer>
    </div>
</body>
</html>`;
}