import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Grid, Paper, Chip, Stack, IconButton, Tooltip } from "@mui/material";
import { 
  School, 
  AutoAwesome, 
  Science, 
  WorkspacePremium,
  HistoryEdu,
  LocationOn,
  CalendarMonth,
  Verified,
  Insights,
  FiberManualRecord,
  ArrowBackIosNew
} from "@mui/icons-material";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * AcademicJourney Component
 * An elite, high-information-density timeline.
 * Features: Back navigation, zig-zag layout with images, 
 * glassmorphism UI, and scroll-synced pathing.
 */
const AcademicJourney = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const pathHeight = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const Step = ({ 
    icon, 
    title, 
    subtitle, 
    university, 
    timeline, 
    status, 
    statusColor,
    description, 
    highlights, 
    tags,
    kpi,
    image,
    isRight // Logic: isRight=true means Content on Right, Image on Left
  }) => (
    <Box sx={{ position: 'relative', mb: { xs: 10, md: 20 }, width: '100%' }}>
      <Grid container spacing={isMobile ? 4 : 10} alignItems="center">
        
        {/* Central Diamond Anchor (Spine) */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: '20px', md: '50%' },
            width: '52px',
            height: '52px',
            backgroundColor: '#0a0a0a',
            border: '2px solid purple',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: '0 0 30px rgba(128, 0, 128, 0.5)',
            transform: 'translateX(-50%) rotate(45deg)',
            '& > *': { transform: 'rotate(-45deg)' } 
          }}
        >
          {icon}
        </Box>

        {/* IMAGE SIDE */}
        <Grid item xs={12} md={6} sx={{ 
          order: { xs: 1, md: isRight ? 1 : 2 },
          display: 'flex',
          justifyContent: isRight ? 'flex-end' : 'flex-start'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: isRight ? -50 : 50 }}
            animate={isVisible ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ width: '100%', maxWidth: '500px' }}
          >
            <Box sx={{ 
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(128, 0, 128, 0.3)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              aspectRatio: '16/10',
              backgroundColor: '#111'
            }}>
              <img 
                src={image} 
                alt={title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.5) contrast(1.1)' }}
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"; }}
              />
              <Box sx={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' 
              }} />
            </Box>
          </motion.div>
        </Grid>

        {/* CONTENT SIDE */}
        <Grid item xs={12} md={6} sx={{ 
          textAlign: 'left',
          pl: { xs: 9, md: isRight ? 4 : 0 },
          pr: { xs: 0, md: isRight ? 0 : 4 },
          order: { xs: 2, md: isRight ? 2 : 1 }
        }}>
          <motion.div
            initial={{ opacity: 0, x: isRight ? 50 : -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Meta Header */}
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
              <Chip 
                label={status} 
                size="small" 
                sx={{ 
                  background: `linear-gradient(45deg, ${statusColor}, #1a1a1a)`, 
                  color: 'white', 
                  fontWeight: 900,
                  fontSize: '0.65rem',
                  letterSpacing: 1
                }} 
              />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarMonth sx={{ fontSize: 14, color: 'purple' }} /> {timeline}
              </Typography>
            </Stack>

            <Typography variant="h3" sx={{ 
                fontWeight: 900, 
                color: 'white', 
                mb: 0.5,
                fontSize: { xs: '1.75rem', md: '2.5rem' }
            }}>
              {title}
            </Typography>
            
            <Typography variant="subtitle1" sx={{ color: 'purple', fontWeight: 600, mb: 2, letterSpacing: 2 }}>
              {subtitle}
            </Typography>

            <Paper elevation={0} sx={{ 
                p: 4, 
                backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '24px',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden'
            }}>
              <Typography sx={{ color: '#aaa', lineHeight: 1.8, mb: 3 }}>
                {description}
              </Typography>

              <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map(tag => (
                   <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)', fontSize: '0.7rem' }} />
                ))}
              </Box>

              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {highlights.map((item, i) => (
                  <Box component="li" key={i} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5, gap: 1.5 }}>
                    <Verified sx={{ color: 'purple', mt: '3px', fontSize: 18 }} />
                    <Typography sx={{ color: '#eee', fontSize: '0.9rem' }}>{item}</Typography>
                  </Box>
                ))}
              </Box>

              {kpi && (
                  <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.7rem', color: '#666', fontWeight: 800 }}>PERFORMANCE</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: 'white', fontWeight: 900 }}>{kpi}</Typography>
                  </Box>
              )}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box
      ref={sectionRef}
      id="academic-journey"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#050505",
        px: { xs: 3, md: 10 },
        py: 15,
        color: "white",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Back Button */}
      <Box sx={{ position: 'fixed', top: 30, left: 30, zIndex: 100 }}>
        <IconButton 
          onClick={() => window.location.href = '/about'}
          sx={{ 
            color: 'white', 
            bgcolor: 'rgba(255,255,255,0.05)', 
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s',
            p: 2,
            '&:hover': { bgcolor: 'purple', transform: 'translateX(-5px)' }
          }}
        >
          <ArrowBackIosNew sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Decorative BG */}
      <Box sx={{ position: 'absolute', top: '10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(128,0,128,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Hero Header */}
      <Box sx={{ textAlign: 'center', mb: 20 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}>
          <Typography variant="overline" sx={{ color: 'purple', fontWeight: 900, letterSpacing: 4 }}>ACADEMIC CHRONICLE</Typography>
          <Typography variant="h2" fontWeight="900" sx={{ fontSize: { xs: '3rem', md: '5rem' }, mb: 2 }}>
            Scholarly <span style={{ color: "purple" }}>Evolution</span>
          </Typography>
          <Typography sx={{ maxWidth: "700px", mx: "auto", color: "#666", fontSize: "1.1rem" }}>
            The trajectory of my formal education and specialized research in AI and Distributed Systems.
          </Typography>
        </motion.div>
      </Box>

      {/* Vertical Spine */}
      <Box sx={{ position: 'relative', maxWidth: '1200px', mx: 'auto' }}>
        <Box sx={{ position: 'absolute', left: { xs: '20px', md: '50%' }, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.05)', zIndex: 1 }} />
        <motion.div
          style={{
            position: 'absolute',
            left: isMobile ? '20px' : '50%',
            top: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, purple, transparent)',
            zIndex: 2,
            height: '100%',
            transformOrigin: 'top',
            scaleY: pathHeight
          }}
        />

        {/* Milestones: Pattern Right -> Left -> Right */}
        
        {/* Step 1: Right Content */}
        <Step 
          isRight={true}
          image="https://images.unsplash.com/photo-1523050853063-91589436026e?auto=format&fit=crop&q=80&w=800"
          icon={<School sx={{ color: 'purple' }} />}
          title="BS in Computer Science"
          subtitle="Engineering Foundation"
          university="FAST-NUCES, Pakistan"
          timeline="2019 — 2023"
          status="COMPLETED"
          statusColor="#1b5e20"
          tags={["C++", "OS", "MERN", "Cloud"]}
          kpi="GPA: 3.74 / 4.00"
          description="A rigorous four-year journey establishing core competencies in low-level programming, operating systems, and distributed web architectures."
          highlights={[
            "Consistent inclusion in the Dean's Honor List",
            "Specialized in high-concurrency systems design",
            "Core member of the AI Research Student Chapter"
          ]}
        />

        {/* Step 2: Left Content */}
        <Step 
          isRight={false}
          image="https://images.unsplash.com/photo-1620712943543-bcc4628c6bb5?auto=format&fit=crop&q=80&w=800"
          icon={<AutoAwesome sx={{ color: 'purple' }} />}
          title="MS in Artificial Intelligence"
          subtitle="Advanced Neural Systems"
          university="Institute of Machine Intelligence"
          timeline="2025 — 2027"
          status="IN PROGRESS"
          statusColor="#4a148c"
          tags={["PyTorch", "Transformers", "LLMs"]}
          kpi="Status: Active Research"
          description="Focusing on the optimization of Vision Transformers and the application of Large Language Models in automated code generation."
          highlights={[
            "Thesis: Efficient Attention Mechanisms for Edge Devices",
            "Graduate Assistant for Deep Learning Laboratory",
            "Developing open-source benchmarks for local LLM inference"
          ]}
        />

        {/* Step 3: Right Content */}
        <Step 
          isRight={true}
          image="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800"
          icon={<Science sx={{ color: 'purple' }} />}
          title="Scientific Specialization"
          subtitle="Industrial AI Application"
          university="Global Tech Academy"
          timeline="Continuous"
          status="ACTIVE"
          statusColor="#01579b"
          tags={["Mathematics", "CUDA", "MLOps"]}
          kpi="12+ Certifications"
          description="Mastering the mathematical underpinnings of machine learning and the practicalities of deploying models at scale via modern MLOps pipelines."
          highlights={[
            "Mathematics for Machine Learning (Imperial College London)",
            "CUDA Parallel Programming Mastery certification",
            "Published contributor to local AI developer ecosystems"
          ]}
        />
      </Box>

      {/* Footer Metrics */}
      <Box sx={{ mt: 10, pt: 8, borderTop: '1px solid rgba(255,255,255,0.03)', textAlign: 'center' }}>
         <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={3}>
                <HistoryEdu sx={{ color: 'purple', fontSize: 40, mb: 1 }}/>
                <Typography variant="h6">Academic Rigor</Typography>
                <Typography variant="body2" sx={{ color: '#444' }}>Deep focus on technical first-principles.</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                <WorkspacePremium sx={{ color: 'purple', fontSize: 40, mb: 1 }}/>
                <Typography variant="h6">Global Standards</Typography>
                <Typography variant="body2" sx={{ color: '#444' }}>Adhering to world-class research methodologies.</Typography>
            </Grid>
         </Grid>
      </Box>
    </Box>
  );
};

export default AcademicJourney;