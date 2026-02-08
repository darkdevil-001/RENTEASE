// HPI 1.7-G
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, ArrowRight, Users, Shield, CheckCircle2, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { getTheme } from '@/lib/theme';

// --- Utility Components ---

const GridLines = ({ theme }: { theme: 'light' | 'dark' }) => (
  <div className={`absolute inset-0 pointer-events-none z-0 flex justify-between select-none overflow-hidden`}>
    <div className={`w-px h-full ${theme === 'dark' ? 'bg-grey700/50' : 'bg-grey200/50'}`} />
    <div className={`w-px h-full ${theme === 'dark' ? 'bg-grey700/50' : 'bg-grey200/50'} hidden md:block`} />
    <div className={`w-px h-full ${theme === 'dark' ? 'bg-grey700/50' : 'bg-grey200/50'} hidden lg:block`} />
    <div className={`w-px h-full ${theme === 'dark' ? 'bg-grey700/50' : 'bg-grey200/50'}`} />
  </div>
);

const SectionLabel = ({ number, text, theme }: { number: string; text: string; theme: 'light' | 'dark' }) => (
  <div className="flex items-center gap-4 mb-8 md:mb-0">
    <span className="font-heading text-xs font-bold text-primary border border-primary px-2 py-1 rounded-full">
      {number}
    </span>
    <span className={`font-heading text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-grey500' : 'text-grey500'}`}>
      {text}
    </span>
  </div>
);

const RevealText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

// --- Main Component ---

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div ref={containerRef} className={`min-h-screen ${theme === 'dark' ? 'bg-grey900 text-grey100' : 'bg-background text-foreground'} font-paragraph selection:bg-primary/10 selection:text-primary overflow-clip`}>
      <Header />

      <main className="relative w-full">
        {/* --- HERO SECTION --- */}
        <section className={`relative w-full min-h-screen flex flex-col pt-32 pb-12 px-6 md:px-12 border-b ${theme === 'dark' ? 'border-grey800' : 'border-grey200'}`}>
          <GridLines theme={theme} />
          
          <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[120rem] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-24">
              <div className="lg:col-span-8">
                <RevealText>
                  <h1 className="font-heading text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9] uppercase mb-6">
                    Rent<span className={theme === 'dark' ? 'text-grey500' : 'text-grey300'}>Ease</span>
                  </h1>
                </RevealText>
                <RevealText delay={0.1}>
                  <p className={`font-paragraph text-xl md:text-2xl ${theme === 'dark' ? 'text-grey300' : 'text-foreground'} max-w-2xl leading-relaxed`}>
                    The Zen of living together. A preference-based sanctuary for finding rooms and roommates with absolute clarity.
                  </p>
                </RevealText>
              </div>
              <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
                 <RevealText delay={0.2}>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-widest mb-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      System Operational
                    </div>
                    <p className={`text-sm text-right hidden lg:block ${theme === 'dark' ? 'text-grey500' : 'text-grey400'}`}>
                      v1.0.4 — Trust Layers Active
                    </p>
                 </RevealText>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-sm mb-12 group">
              <motion.div style={{ scale: scaleParallax }} className="w-full h-full">
                <Image
                  src="https://static.wixstatic.com/media/c60ce8_0bda06f0ff7c4db98107244f9584f775~mv2.png?originWidth=960&originHeight=512"
                  alt="Minimalist architectural space representing clarity"
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                  width={1920}
                />
              </motion.div>
              <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-grey900/80' : 'from-background/80'} to-transparent`} />
              
              {/* Floating Action Cards */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  <Link to="/find-room" className="group/card">
                    <div className={`${theme === 'dark' ? 'bg-grey800/90 border-grey700' : 'bg-background/90 border-grey200'} backdrop-blur-md border p-8 hover:border-primary transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden`}>
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary transform -translate-y-full group-hover/card:translate-y-0 transition-transform duration-300" />
                      <div>
                        <Search className={`w-8 h-8 ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-4 group-hover/card:text-primary transition-colors`} />
                        <h3 className="font-heading text-2xl uppercase tracking-tight mb-2">Find a Room</h3>
                        <p className={`${theme === 'dark' ? 'text-grey400' : 'text-grey500'} text-sm`}>Search based on lifestyle, budget, and compatibility.</p>
                      </div>
                      <div className="mt-8 flex justify-end">
                        <MoveRight className={`w-6 h-6 ${theme === 'dark' ? 'text-grey600' : 'text-grey300'} group-hover/card:text-primary transition-colors transform group-hover/card:translate-x-2 duration-300`} />
                      </div>
                    </div>
                  </Link>

                  <Link to="/list-room" className="group/card">
                    <div className={`${theme === 'dark' ? 'bg-grey800/90 border-grey700' : 'bg-background/90 border-grey200'} backdrop-blur-md border p-8 hover:border-primary transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden`}>
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary transform -translate-y-full group-hover/card:translate-y-0 transition-transform duration-300" />
                      <div>
                        <Home className={`w-8 h-8 ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-4 group-hover/card:text-primary transition-colors`} />
                        <h3 className="font-heading text-2xl uppercase tracking-tight mb-2">List a Room</h3>
                        <p className={`${theme === 'dark' ? 'text-grey400' : 'text-grey500'} text-sm`}>Post your space. Manage applicants. Find the perfect tenant.</p>
                      </div>
                      <div className="mt-8 flex justify-end">
                        <MoveRight className={`w-6 h-6 ${theme === 'dark' ? 'text-grey600' : 'text-grey300'} group-hover/card:text-primary transition-colors transform group-hover/card:translate-x-2 duration-300`} />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PHILOSOPHY / FEATURES SCROLL --- */}
        <section className={`relative w-full py-32 px-6 md:px-12 border-b ${theme === 'dark' ? 'border-grey800 bg-grey800/30' : 'border-grey200 bg-grey100/30'}`}>
          <GridLines theme={theme} />
          <div className="max-w-[120rem] mx-auto relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Sticky Sidebar */}
              <div className="lg:col-span-4 h-fit lg:sticky lg:top-32 mb-16 lg:mb-0">
                <SectionLabel number="01" text="Core Principles" theme={theme} />
                <h2 className={`font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight mb-8 ${theme === 'dark' ? 'text-grey100' : 'text-foreground'}`}>
                  Designed for <br/><span className={theme === 'dark' ? 'text-grey600' : 'text-grey400'}>Harmony.</span>
                </h2>
                <p className={`text-lg ${theme === 'dark' ? 'text-grey400' : 'text-grey600'} max-w-md mb-8`}>
                  We believe finding a home is about more than just square footage. It's about the rhythm of daily life, shared values, and mutual respect.
                </p>
                <div className="hidden lg:block w-12 h-1 bg-primary" />
              </div>

              {/* Scrollable Content */}
              <div className="lg:col-span-8 flex flex-col gap-32">
                
                {/* Feature 1: Preference Matching */}
                <div className="group relative">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                      <div className={`mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-grey800 border-grey700' : 'bg-white border-grey200'} border shadow-sm`}>
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className={`font-heading text-3xl uppercase tracking-wide mb-4 ${theme === 'dark' ? 'text-grey100' : 'text-foreground'}`}>Preference Matching</h3>
                      <p className={`${theme === 'dark' ? 'text-grey400' : 'text-grey600'} leading-relaxed mb-6`}>
                        Our algorithm doesn't just match locations; it matches lifestyles. Filter by sleep schedules, social habits, and cleanliness standards to find someone who truly fits your rhythm.
                      </p>
                      <ul className="space-y-3">
                        {['Lifestyle Compatibility', 'Budget Alignment', 'Habit Synchronization'].map((item, i) => (
                          <li key={i} className={`flex items-center gap-3 text-sm font-medium ${theme === 'dark' ? 'text-grey300' : 'text-grey800'}`}>
                            <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`order-1 md:order-2 relative h-[400px] overflow-hidden rounded-sm border ${theme === 'dark' ? 'border-grey700' : 'border-grey200'}`}>
                      <Image 
                        src="https://static.wixstatic.com/media/c60ce8_0a05d5b9ccd440ea888bf39cae418b15~mv2.png?originWidth=640&originHeight=384" 
                        alt="Abstract representation of matching"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
                    </div>
                  </div>
                </div>

                {/* Feature 2: Group Sharing */}
                <div className="group relative">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className={`relative h-[400px] overflow-hidden rounded-sm border ${theme === 'dark' ? 'border-grey700' : 'border-grey200'}`}>
                       <Image 
                        src="https://static.wixstatic.com/media/c60ce8_4639faaca0f844e2a5260c7e80ff58ac~mv2.png?originWidth=640&originHeight=384" 
                        alt="Group living concept"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-grey900/10" />
                    </div>
                    <div>
                      <div className={`mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-grey800 border-grey700' : 'bg-white border-grey200'} border shadow-sm`}>
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className={`font-heading text-3xl uppercase tracking-wide mb-4 ${theme === 'dark' ? 'text-grey100' : 'text-foreground'}`}>Group Sharing</h3>
                      <p className={`${theme === 'dark' ? 'text-grey400' : 'text-grey600'} leading-relaxed mb-6`}>
                        Form a collective. Join or create roommate groups for 2-6 members. We facilitate the formation of micro-communities based on shared preferences and move-in timelines.
                      </p>
                      <Button variant="outline" className={`rounded-none ${theme === 'dark' ? 'border-grey700 hover:bg-primary hover:text-white hover:border-primary' : 'border-grey300 hover:bg-primary hover:text-white hover:border-primary'} transition-all`}>
                        Explore Groups
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Feature 3: Trust Layers */}
                <div className="group relative">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                      <div className={`mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-grey800 border-grey700' : 'bg-white border-grey200'} border shadow-sm`}>
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className={`font-heading text-3xl uppercase tracking-wide mb-4 ${theme === 'dark' ? 'text-grey100' : 'text-foreground'}`}>Trust Layers</h3>
                      <p className={`${theme === 'dark' ? 'text-grey400' : 'text-grey600'} leading-relaxed mb-6`}>
                        Security is the foundation of peace. Optional verification layers allow users to badge their profiles, creating a transparent ecosystem of trust without compromising privacy.
                      </p>
                      <div className={`p-4 ${theme === 'dark' ? 'bg-grey800 border-grey700' : 'bg-white border-grey200'} border mt-4`}>
                        <p className={`text-xs uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-grey500' : 'text-grey500'}`}>Verification Status</p>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-full ${theme === 'dark' ? 'bg-grey700' : 'bg-grey100'} rounded-full overflow-hidden`}>
                            <div className="h-full bg-primary w-3/4" />
                          </div>
                          <span className="text-xs font-bold text-primary">SECURE</span>
                        </div>
                      </div>
                    </div>
                    <div className={`order-1 md:order-2 relative h-[400px] overflow-hidden rounded-sm border ${theme === 'dark' ? 'border-grey700' : 'border-grey200'}`}>
                       <Image 
                        src="https://static.wixstatic.com/media/c60ce8_99824c8f551b45bbbb9e44d4d2c401f7~mv2.png?originWidth=640&originHeight=384" 
                        alt="Security and trust abstract"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* --- IMMERSIVE BREAK SECTION --- */}
        <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-grey900 text-white">
          <div className="absolute inset-0 opacity-40">
             <Image 
                src="https://static.wixstatic.com/media/c60ce8_40e3dbc9db124b6db62cb26bec74c071~mv2.png?originWidth=960&originHeight=640" 
                alt="Cityscape at night"
                className="w-full h-full object-cover"
              />
          </div>
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="relative z-10 text-center max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-8">
                Find Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-grey500">Sanctuary</span>
              </h2>
              <p className="font-paragraph text-xl text-grey300 max-w-2xl mx-auto mb-12">
                In a chaotic world, your home should be the stillness. Start your journey to a better living environment today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/signup">
                  <Button className="bg-white text-black hover:bg-grey200 px-10 py-8 text-lg rounded-none min-w-[200px]">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-10 py-8 text-lg rounded-none min-w-[200px]">
                    Login
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- STATS / TRUST TICKER --- */}
        <section className={`py-16 border-b ${theme === 'dark' ? 'border-grey800 bg-grey900' : 'border-grey200 bg-background'} overflow-hidden`}>
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Active Listings", value: "2,400+" },
                { label: "Roommates Matched", value: "8,500+" },
                { label: "Cities Covered", value: "14" },
                { label: "Trust Score", value: "98%" },
              ].map((stat, i) => (
                <div key={i} className={`flex flex-col items-center justify-center border-r ${theme === 'dark' ? 'border-grey800' : 'border-grey200'} last:border-0`}>
                  <span className={`font-heading text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-grey100' : 'text-foreground'} mb-2`}>{stat.value}</span>
                  <span className={`font-paragraph text-sm uppercase tracking-widest ${theme === 'dark' ? 'text-grey500' : 'text-grey500'}`}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className={`py-32 px-6 md:px-12 ${theme === 'dark' ? 'bg-grey900' : 'bg-background'} relative`}>
          <GridLines theme={theme} />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <SectionLabel number="02" text="Ready to Begin?" theme={theme} />
            <h2 className={`font-heading text-4xl md:text-6xl ${theme === 'dark' ? 'text-grey100' : 'text-foreground'} mb-12 uppercase tracking-tight`}>
              The search ends here.
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
               <Link to="/find-room" className="group block">
                  <div className={`border ${theme === 'dark' ? 'border-grey800 hover:bg-grey800' : 'border-grey200 hover:bg-grey100'} p-12 transition-colors duration-500 flex flex-col items-center`}>
                    <Search className={`w-12 h-12 ${theme === 'dark' ? 'text-grey600' : 'text-grey400'} mb-6 group-hover:text-primary transition-colors`} />
                    <span className={`font-heading text-xl uppercase tracking-wide ${theme === 'dark' ? 'text-grey200' : 'text-foreground'}`}>I need a room</span>
                  </div>
               </Link>
               <Link to="/list-room" className="group block">
                  <div className={`border ${theme === 'dark' ? 'border-grey800 hover:bg-grey800' : 'border-grey200 hover:bg-grey100'} p-12 transition-colors duration-500 flex flex-col items-center`}>
                    <Home className={`w-12 h-12 ${theme === 'dark' ? 'text-grey600' : 'text-grey400'} mb-6 group-hover:text-primary transition-colors`} />
                    <span className={`font-heading text-xl uppercase tracking-wide ${theme === 'dark' ? 'text-grey200' : 'text-foreground'}`}>I have a room</span>
                  </div>
               </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
