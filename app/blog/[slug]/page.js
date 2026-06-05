import Header from '../../../components/Header.js';
import Footer from '../../../components/Footer.js';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const blogPosts = {
  'how-to-reduce-fuel-costs-trucking': {
    title: '10 Proven Ways to Reduce Fuel Costs in Your Trucking Operation',
    date: '2025-01-15',
    author: 'Alex Martinez',
    category: 'Cost Optimization',
    readTime: '8 min read',
    content: `
      <p>Fuel is typically the largest expense for any trucking operation, accounting for 25-35% of operating costs. With fuel prices remaining volatile, finding ways to improve fuel efficiency is more important than ever. Here are 10 proven strategies to reduce your fuel costs.</p>
      
      <h2>1. Optimize Your Routes</h2>
      <p>Use route optimization software to plan the most efficient paths. Avoiding traffic congestion, construction zones, and unnecessary miles can save significant fuel. Even a 5% reduction in miles driven can lead to substantial savings.</p>
      
      <h2>2. Reduce Idle Time</h2>
      <p>Excessive idling is one of the biggest fuel wasters. A single truck idling for 6 hours a day can waste over 1,000 gallons of fuel per year. Install automatic engine shutoff systems and educate drivers on the cost of idling.</p>
      
      <h2>3. Maintain Proper Tire Pressure</h2>
      <p>Under-inflated tires increase rolling resistance, which can reduce fuel efficiency by up to 3%. Check tire pressure weekly and keep them at the manufacturer's recommended PSI.</p>
      
      <h2>4. Use Aerodynamic Equipment</h2>
      <p>Adding aerodynamic features like side skirts, roof fairings, and gap reducers can improve fuel economy by 5-15% at highway speeds. The upfront investment often pays for itself within a year.</p>
      
      <h2>5. Implement Speed Management</h2>
      <p>Fuel efficiency drops significantly above 65 mph. Reducing highway speed from 75 mph to 65 mph can improve fuel economy by 15-20%. Consider governing your trucks at 68 mph.</p>
      
      <h2>6. Regular Preventive Maintenance</h2>
      <p>Well-maintained engines run more efficiently. Regular oil changes, air filter replacements, and fuel system cleaning can improve fuel economy by 4-10%.</p>
      
      <h2>7. Train Drivers on Eco-Driving</h2>
      <p>Smooth acceleration, maintaining steady speeds, and anticipating traffic flow can significantly reduce fuel consumption. Invest in driver training programs focused on fuel-efficient driving techniques.</p>
      
      <h2>8. Track Fuel Data</h2>
      <p>Use fuel tracking software like FreightPilot to monitor fuel purchases, track MPG trends, and identify outliers. Data-driven decisions lead to better fuel management.</p>
      
      <h2>9. Consider Fuel Cards</h2>
      <p>Fuel cards can provide discounts at participating stations and give you better visibility into fuel spending. Many cards offer 3-5 cents per gallon savings.</p>
      
      <h2>10. Plan for Weight Efficiency</h2>
      <p>Every extra pound reduces fuel economy. Remove unnecessary equipment and choose lightweight materials where possible without compromising safety.</p>
      
      <h2>Track Your Progress</h2>
      <p>The key to reducing fuel costs is measurement. With FreightPilot's fuel tracking feature, you can log every fill-up, track cost-per-mile, and monitor MPG trends over time. Start your free trial today and take control of your fuel expenses.</p>
    `,
  },
  'trucking-back-office-automation-guide': {
    title: 'The Complete Guide to Trucking Back Office Automation',
    date: '2025-01-08',
    author: 'Sarah Chen',
    category: 'Productivity',
    readTime: '12 min read',
    content: `
      <p>Running a trucking business involves far more than just driving. Between loads, expenses, settlements, maintenance, compliance documents, and invoicing, the administrative workload can be overwhelming. Most owner-operators and small fleet owners spend 15-20 hours per week on paperwork alone.</p>
      
      <h2>What is Back Office Automation?</h2>
      <p>Back office automation means using software to handle repetitive administrative tasks automatically. Instead of manually entering data into spreadsheets, calculating settlements by hand, or chasing down paperwork, automation does the heavy lifting for you.</p>
      
      <h2>The Cost of Manual Processes</h2>
      <p>Let's look at the numbers. If you spend 15 hours per week on administrative tasks at an opportunity cost of $50/hour, that's $750 per week or $39,000 per year. For a small fleet owner, that's a significant amount of lost revenue that could be going toward growth.</p>
      
      <h2>Key Areas to Automate</h2>
      
      <h3>Load Management</h3>
      <p>Automated load tracking gives you real-time visibility into every load's status, profitability, and driver assignment. No more digging through emails to find rate confirmations.</p>
      
      <h3>Expense Tracking</h3>
      <p>Log expenses as they happen. Categorize them automatically and see your bottom line at a glance. No more saving receipts in a shoebox.</p>
      
      <h3>Driver Settlements</h3>
      <p>Settlement calculations that used to take hours can be done in minutes. The system automatically calculates pay based on rates, expenses, and commission structures.</p>
      
      <h3>Invoicing</h3>
      <p>Generate invoices from completed loads with one click. Send them to customers automatically and track payment status.</p>
      
      <h3>Compliance Documents</h3>
      <p>Never miss a document expiration again. Automated alerts for insurance renewals, CDL expirations, and DOT inspection deadlines.</p>
      
      <h2>How FreightPilot Solves This</h2>
      <p>FreightPilot was built from the ground up to automate trucking back office tasks. Instead of juggling multiple tools and spreadsheets, you get one integrated platform that handles everything. The AI assistant can even answer questions about your business instantly — no more digging through reports.</p>
      
      <p>Ready to automate your back office? Start your free trial of FreightPilot today.</p>
    `,
  },
  'ifta-reporting-simplified': {
    title: 'IFTA Reporting Made Simple: A Step-by-Step Guide',
    date: '2024-12-20',
    author: 'Marcus Johnson',
    category: 'Compliance',
    readTime: '6 min read',
    content: `
      <p>The International Fuel Tax Agreement (IFTA) is an agreement between US states and Canadian provinces that simplifies fuel tax reporting for carriers that operate in multiple jurisdictions. While IFTA reporting can seem daunting, it's manageable with the right approach.</p>
      
      <h2>What is IFTA?</h2>
      <p>IFTA allows carriers to file a single quarterly fuel tax return covering all jurisdictions they operate in, rather than filing separately in each state or province. This saves enormous administrative time.</p>
      
      <h2>What You Need to Track</h2>
      <p>For accurate IFTA reporting, you need to track:</p>
      <ul>
        <li>Total miles driven in each jurisdiction</li>
        <li>Total gallons of fuel purchased in each jurisdiction</li>
        <li>Total gallons of fuel consumed (may differ from purchased)</li>
      </ul>
      
      <h2>Step 1: Collect Mileage Data</h2>
      <p>You need odometer readings at the beginning and end of each trip, and when crossing jurisdictional boundaries. Many ELDs (Electronic Logging Devices) can capture this automatically.</p>
      
      <h2>Step 2: Track Fuel Purchases</h2>
      <p>Save all fuel receipts. You need to know how many gallons you purchased in each jurisdiction. Fuel cards can help automate this data collection.</p>
      
      <h2>Step 3: Calculate Fuel Tax</h2>
      <p>The basic formula is: (Total miles in jurisdiction / Total miles) × Total gallons consumed = Taxable gallons in jurisdiction. Then compare taxable gallons to purchased gallons to determine if you owe or get a credit.</p>
      
      <h2>Step 4: File Quarterly</h2>
      <p>IFTA returns are due at the end of January, April, July, and October for the previous quarter. Late filing can result in penalties.</p>
      
      <h2>Simplify with FreightPilot</h2>
      <p>With FreightPilot's fuel tracking and analytics features, you can easily export the data needed for IFTA reporting. Track every fuel purchase, monitor mileage, and generate reports that make quarterly filing straightforward.</p>
    `,
  },
  'choosing-trucking-software': {
    title: 'How to Choose the Right Trucking Software for Your Fleet',
    date: '2024-12-10',
    author: 'Alex Martinez',
    category: 'Guides',
    readTime: '10 min read',
    content: `
      <p>The trucking software market is crowded with options, ranging from simple load boards to complex enterprise systems. Finding the right fit for your operation can be overwhelming. Here's a practical framework for choosing the right software.</p>
      
      <h2>1. Identify Your Pain Points</h2>
      <p>Before evaluating software, list your biggest administrative headaches. Is it settlement calculations? Expense tracking? Compliance documents? Maintenance scheduling? The software you choose should solve your specific problems.</p>
      
      <h2>2. Consider Your Fleet Size</h2>
      <p>Software for an owner-operator differs from software for a 50-truck fleet. Owner-operators need simplicity and affordability, while larger fleets need multi-user access, driver management, and advanced reporting.</p>
      
      <h2>3. Look for Integration</h2>
      <p>The best software replaces multiple tools, not adds to them. Look for platforms that combine load management, expense tracking, settlements, invoicing, and compliance in one place.</p>
      
      <h2>4. Check for AI Capabilities</h2>
      <p>Modern trucking software should leverage AI to save you time. Features like natural language query (asking questions about your business) and automated data entry can be game-changers.</p>
      
      <h2>5. Evaluate Pricing</h2>
      <p>Look for transparent pricing without hidden fees. Consider the total cost, including setup fees, monthly subscriptions, and any per-user or per-truck charges. The right software should pay for itself in time savings.</p>
      
      <h2>6. Test with Real Data</h2>
      <p>Always take advantage of free trials. Test the software with your actual workflows. If a platform offers a demo environment with realistic data, that's even better for evaluation.</p>
      
      <h2>Why FreightPilot?</h2>
      <p>FreightPilot was designed specifically for small trucking operations. It combines all the essential features — load management, fuel tracking, maintenance, settlements, invoicing, documents, and analytics — with an AI assistant that makes finding information instant. With transparent pricing starting at $19/month and a 14-day free trial, it's easy to see if it's the right fit.</p>
    `,
  },
  'driver-settlements-best-practices': {
    title: 'Driver Settlements: Best Practices for Accuracy and Transparency',
    date: '2024-11-28',
    author: 'Sarah Chen',
    category: 'Operations',
    readTime: '7 min read',
    content: `
      <p>Driver settlements are one of the most critical — and time-consuming — tasks in fleet management. Accurate, transparent settlements build trust with your drivers and keep your operation running smoothly.</p>
      
      <h2>Why Settlement Accuracy Matters</h2>
      <p>Disputes over settlements are a leading cause of driver turnover. When drivers feel they're being paid fairly and can see exactly how their pay is calculated, they're more likely to stay with your company long-term.</p>
      
      <h2>Key Components of a Settlement</h2>
      <p>A complete driver settlement typically includes:</p>
      <ul>
        <li>Gross revenue from loads driven</li>
        <li>Deductions (fuel advances, tolls, repairs, etc.)</li>
        <li>Commission or percentage split</li>
        <li>Net pay calculation</li>
        <li>Any additional bonuses or adjustments</li>
      </ul>
      
      <h2>Best Practice 1: Automate Calculations</h2>
      <p>Manual settlement calculations are prone to errors. Use software that automatically calculates settlements based on your commission structure. This eliminates math errors and saves hours of time.</p>
      
      <h2>Best Practice 2: Provide Detailed Statements</h2>
      <p>Give drivers a detailed breakdown showing every load, every deduction, and every adjustment. Transparency builds trust. PDF settlement statements that can be emailed or printed are ideal.</p>
      
      <h2>Best Practice 3: Settle Quickly</h2>
      <p>The sooner drivers get paid, the happier they are. Aim to settle within 24-48 hours of a load's completion. Automated systems make this possible.</p>
      
      <h2>Best Practice 4: Keep Records</h2>
      <p>Maintain a history of all settlements for reference and dispute resolution. Digital records are easier to search and organize than paper files.</p>
      
      <h2>How FreightPilot Helps</h2>
      <p>FreightPilot's settlement calculator automates the entire process. Enter the load rate, expenses, and commission structure, and the system calculates the settlement instantly. Generate PDF statements, track payment history, and give your drivers access to their settlement details. It's faster, more accurate, and more transparent than spreadsheets.</p>
    `,
  },
};

export default function BlogPostPage({ params }) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Back */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">{post.category}</span>
              <span className="text-xs text-gray-400">{post.readTime}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-primary leading-tight mb-4">{post.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>By {post.author}</span>
              <span className="text-gray-300">|</span>
              <span>{post.date}</span>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <p className="text-sm text-gray-500 mb-3">Share this article:</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-primary hover:text-white transition-colors">Twitter</button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-primary hover:text-white transition-colors">Facebook</button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-primary hover:text-white transition-colors">LinkedIn</button>
            </div>
          </div>

          {/* CTA */}
          <div className="gradient-hero rounded-xl p-8 mt-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to streamline your operation?</h3>
            <p className="text-gray-300 mb-5">Try FreightPilot free for 14 days.</p>
            <a href="/auth/register" className="inline-block bg-accent text-white px-8 py-3 rounded-xl font-bold hover:bg-accent-600 transition-all">
              Start Free Trial
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}