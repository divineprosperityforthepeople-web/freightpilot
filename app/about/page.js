import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import Link from 'next/link';

const team = [
  { name: 'Alex Martinez', role: 'CEO & Co-Founder', bio: 'Former fleet owner with 15 years in trucking. Built FreightPilot to solve the problems he experienced firsthand.' },
  { name: 'Sarah Chen', role: 'CTO & Co-Founder', bio: 'Software engineer with a passion for AI. Previously led engineering at a logistics SaaS company.' },
  { name: 'Marcus Johnson', role: 'Head of Product', bio: 'Product leader with expertise in B2B SaaS. Focused on building tools that truckers actually love to use.' },
];

const milestones = [
  { year: '2023', event: 'FreightPilot founded by Alex and Sarah after identifying the need for modern trucking back office software.' },
  { year: '2024 Q1', event: 'Beta launch with 50 owner-operators. 95% retention rate during beta.' },
  { year: '2024 Q3', event: 'Public launch with Stripe billing, AI assistant, and comprehensive feature set.' },
  { year: '2025', event: 'Growing serving hundreds of trucking operations nationwide.' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Built by Truckers, <span className="text-accent">for Truckers</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              FreightPilot was born from the frustration of managing a trucking business with spreadsheets, 
              sticky notes, and a dozen different apps. We knew there had to be a better way.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              We believe every trucking operation — whether you run one truck or fifty — deserves 
              access to enterprise-grade software that&apos;s affordable, easy to use, and actually 
              built for the way truckers work. Our mission is to eliminate the back office headache 
              so you can focus on what matters: moving freight.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-20 bg-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Simplicity', desc: 'We believe software should be simple. If it takes more than two clicks, we\'ve failed.' },
                { title: 'Affordability', desc: 'Powerful tools shouldn\'t cost a fortune. We price our software so small operators can thrive.' },
                { title: 'Innovation', desc: 'We leverage AI and modern technology to solve real problems, not just add bells and whistles.' },
              ].map((v) => (
                <div key={v.title} className="card text-center">
                  <h3 className="text-xl font-bold text-primary mb-3">{v.title}</h3>
                  <p className="text-gray-600">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Story</h2>
            <div className="relative">
              {milestones.map((milestone, i) => (
                <div key={i} className="flex gap-6 mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-secondary rounded-full" />
                    {i < milestones.length - 1 && <div className="w-0.5 h-full bg-gray-200" />}
                  </div>
                  <div className="pb-8">
                    <span className="text-sm font-bold text-secondary">{milestone.year}</span>
                    <p className="text-gray-700 mt-1">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-20 bg-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Meet the Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.name} className="card text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-white font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                  <p className="text-secondary font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 gradient-hero">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Join the FreightPilot Family</h2>
            <p className="text-xl text-gray-300 mb-8">Start your free trial today and see why truckers love FreightPilot.</p>
            <Link href="/auth/register" className="inline-block bg-accent text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-accent-600 shadow-lg shadow-accent/30 transition-all duration-200 hover:scale-105">
              Start Free Trial
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}