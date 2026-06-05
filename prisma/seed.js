import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.contactMessage.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.document.deleteMany({});
  await prisma.settlement.deleteMany({});
  await prisma.maintenanceRecord.deleteMany({});
  await prisma.fuelExpense.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.load.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.driver.deleteMany({});
  await prisma.truck.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash('password123', 10);

  const companiesData = [
    { name: 'Blue Horizon Transport', email: 'owner@bluehorizon.com' },
    { name: 'Freedom Freight LLC', email: 'admin@freedomfreight.com' },
    { name: 'Apex Logistics Group', email: 'contact@apexlogistics.com' },
    { name: 'Patriot Trucking Solutions', email: 'info@patriottrucking.com' },
    { name: 'Southern Haulers Inc.', email: 'ops@southernhaulers.com' },
  ];

  const driversData = [
    { firstName: 'Michael', lastName: 'Johnson' },
    { firstName: 'Robert', lastName: 'Williams' },
    { firstName: 'James', lastName: 'Carter' },
    { firstName: 'Anthony', lastName: 'Davis' },
    { firstName: 'Christopher', lastName: 'Brown' },
  ];

  const brokers = ['TQL', 'CH Robinson', 'JB Hunt', 'Landstar', 'Uber Freight', 'Coyote Logistics'];
  const locations = [
    'Chicago, IL', 'Atlanta, GA', 'Dallas, TX', 'Los Angeles, CA', 'New York, NY',
    'Seattle, WA', 'Miami, FL', 'Denver, CO', 'Phoenix, AZ', 'Houston, TX',
    'Charlotte, NC', 'Columbus, OH', 'Indianapolis, IN', 'Nashville, TN'
  ];
  const commodities = ['General Freight', 'Produce', 'Electronics', 'Building Materials', 'Auto Parts', 'Beverages'];
  const truckMakes = ['Freightliner', 'Kenworth', 'Peterbilt', 'Volvo', 'International'];
  const customersData = [
    { name: 'Walmart DC' }, { name: 'Amazon Fulfillment' }, { name: 'Home Depot' },
    { name: 'Lowe\'s' }, { name: 'Tyson Foods' }, { name: 'Target' },
    { name: 'Costco' }, { name: 'Kroger' }, { name: 'FedEx' }, { name: 'UPS' }
  ];

  for (let i = 0; i < companiesData.length; i++) {
    const companyInfo = companiesData[i];
    
    // Create User
    const user = await prisma.user.create({
      data: {
        email: companyInfo.email,
        password: hashedPassword,
        name: `Owner of ${companyInfo.name}`,
        role: 'user',
        emailVerified: true,
      }
    });

    // Create Company
    const company = await prisma.company.create({
      data: {
        name: companyInfo.name,
        address: `${100 + i} Logistics Way, Trucktown, USA`,
        phone: `555-010${i}`,
        dotNumber: `DOT${1000000 + i}`,
        mcNumber: `MC${200000 + i}`,
        isDemo: true,
        userId: user.id,
      }
    });

    // Create Subscription
    await prisma.subscription.create({
      data: {
        userId: user.id,
        plan: i === 0 ? 'growth-fleet' : (i < 3 ? 'small-fleet' : 'starter'),
        status: 'active',
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      }
    });

    // Create Trucks for this company
    const trucks = [];
    for (let t = 0; t < 3; t++) {
      const truck = await prisma.truck.create({
        data: {
          unitNumber: `T-${100 + t + (i * 10)}`,
          vin: `VIN${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
          make: truckMakes[Math.floor(Math.random() * truckMakes.length)],
          model: 'Cascadia',
          year: 2020 + t,
          licensePlate: `TRK-${1000 + t + (i * 10)}`,
          companyId: company.id,
        }
      });
      trucks.push(truck);
    }

    // Create Drivers for this company
    const driverInfo = driversData[i];
    const driver = await prisma.driver.create({
      data: {
        firstName: driverInfo.firstName,
        lastName: driverInfo.lastName,
        email: `${driverInfo.firstName.toLowerCase()}@${companyInfo.name.split(' ')[0].toLowerCase()}.com`,
        phone: `555-020${i}`,
        cdlNumber: `CDL${8000000 + i}`,
        payType: 'cpm',
        payRate: 0.65,
        companyId: company.id,
        truckId: trucks[0].id,
      }
    });

    // Create Customers for this company
    const companyCustomers = [];
    for (let c = 0; c < customersData.length; c++) {
      const customer = await prisma.customer.create({
        data: {
          name: customersData[c].name,
          companyName: customersData[c].name,
          email: `contact@${customersData[c].name.toLowerCase().replace(' ', '')}.com`,
          companyId: company.id,
        }
      });
      companyCustomers.push(customer);
    }

    // Create Loads for this company
    for (let l = 0; l < 12; l++) {
      const rate = 1500 + Math.random() * 7000;
      const fuelCost = 300 + Math.random() * 1200;
      const load = await prisma.load.create({
        data: {
          loadNumber: `L-${10000 + l + (i * 100)}`,
          status: l < 2 ? 'active' : (l < 10 ? 'delivered' : 'pending'),
          pickupDate: new Date(Date.now() - (10 - l) * 2 * 24 * 60 * 60 * 1000),
          deliveryDate: new Date(Date.now() - (9 - l) * 2 * 24 * 60 * 60 * 1000),
          pickupLocation: locations[Math.floor(Math.random() * locations.length)],
          deliveryLocation: locations[Math.floor(Math.random() * locations.length)],
          commodity: commodities[Math.floor(Math.random() * commodities.length)],
          rate: rate,
          fuelCost: fuelCost,
          brokerName: brokers[Math.floor(Math.random() * brokers.length)],
          totalMiles: 500 + Math.random() * 2000,
          companyId: company.id,
          driverId: driver.id,
          truckId: trucks[Math.floor(Math.random() * trucks.length)].id,
          customerId: companyCustomers[Math.floor(Math.random() * companyCustomers.length)].id,
        }
      });

      // Create Invoice for delivered loads
      if (l < 10) {
        await prisma.invoice.create({
          data: {
            invoiceNumber: `INV-${10000 + l + (i * 100)}`,
            status: l < 5 ? 'paid' : 'sent',
            amount: rate,
            amountPaid: l < 5 ? rate : 0,
            issueDate: load.deliveryDate,
            dueDate: new Date(load.deliveryDate.getTime() + 30 * 24 * 60 * 60 * 1000),
            paidDate: l < 5 ? new Date(load.deliveryDate.getTime() + 15 * 24 * 60 * 60 * 1000) : null,
            companyId: company.id,
            customerId: load.customerId,
            loadId: load.id,
          }
        });
      }

      // Create Fuel Expenses for some loads
      if (l < 8) {
        await prisma.fuelExpense.create({
          data: {
            date: load.pickupDate,
            amount: 50 + Math.random() * 150,
            cost: fuelCost / 2,
            vendor: 'Pilot Flying J',
            location: load.pickupLocation,
            companyId: company.id,
            loadId: load.id,
            truckId: load.truckId,
          }
        });
      }
    }

    // Maintenance Records
    for (let m = 0; m < 4; m++) {
      await prisma.maintenanceRecord.create({
        data: {
          type: m === 0 ? 'oil-change' : (m === 1 ? 'tire' : 'inspection'),
          description: `Regular ${m === 0 ? 'oil change' : (m === 1 ? 'tire rotation' : 'annual inspection')}`,
          date: new Date(Date.now() - (m + 1) * 30 * 24 * 60 * 60 * 1000),
          cost: 150 + Math.random() * 1000,
          vendor: 'Truck Repairs Inc',
          status: 'completed',
          companyId: company.id,
          truckId: trucks[m % trucks.length].id,
        }
      });
    }

    // Settlements
    for (let s = 0; s < 2; s++) {
      await prisma.settlement.create({
        data: {
          periodStart: new Date(Date.now() - (s + 2) * 14 * 24 * 60 * 60 * 1000),
          periodEnd: new Date(Date.now() - (s + 1) * 14 * 24 * 60 * 60 * 1000),
          totalPay: 2500 + Math.random() * 1500,
          grossRevenue: 8000 + Math.random() * 4000,
          deductions: 200 + Math.random() * 300,
          status: 'paid',
          paidDate: new Date(Date.now() - (s + 1) * 12 * 24 * 60 * 60 * 1000),
          companyId: company.id,
          driverId: driver.id,
        }
      });
    }

    // Documents
    const docTypes = ['insurance', 'cdl', 'registration', 'permit', 'dot'];
    for (let d = 0; d < docTypes.length; d++) {
      await prisma.document.create({
        data: {
          name: `${docTypes[d].toUpperCase()} Document`,
          type: docTypes[d],
          expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
          companyId: company.id,
          driverId: d === 1 ? driver.id : null,
          truckId: d === 2 ? trucks[0].id : null,
        }
      });
    }
  }

  // Blog Posts
  const blogPosts = [
    { 
      title: 'Top 10 Ways Trucking Companies Lose Money', 
      slug: 'top-10-ways-trucking-companies-lose-money',
      excerpt: 'Discover the most common financial pitfalls in trucking and how to avoid them to protect your bottom line.',
      content: `<h2>1. Empty Miles</h2><p>Running empty miles is one of the biggest profit killers in trucking. Every mile without a load is pure cost. Use load boards effectively and build relationships with brokers to minimize deadhead.</p><h2>2. Poor Fuel Management</h2><p>Fuel is typically the second-largest expense after the driver. Without tracking fuel costs per mile, you're flying blind. Use fuel cards, optimize routes, and monitor MPG trends.</p><h2>3. Missed Maintenance</h2><p>Skipping routine maintenance leads to costly breakdowns and extended downtime. A single roadside repair can cost thousands and take days.</p><h2>4. Late Payments</h2><p>Waiting 30-60 days for payment creates cash flow crunches. Offer early payment discounts or use factoring services strategically.</p><h2>5. Insurance Gaps</h2><p>Underinsuring or overinsuring both cost money. Review your coverage annually and work with a trucking-specific agent.</p><h2>6. Detention and Layover</h2><p>Waiting at shippers and receivers without compensation eats into your profits. Know your detention policies and bill for every minute.</p><h2>7. Overlooking Small Expenses</h2><p>Tolls, parking, scales, and permits add up fast. Track every expense, no matter how small. It all impacts your bottom line.</p><h2>8. Poor Route Planning</h2><p>Taking inefficient routes wastes fuel, time, and miles. Use routing software and stay informed about road conditions and construction.</p><h2>9. Not Using Technology</h2><p>Spreadsheets and paper logs are obsolete. Modern trucking software like FreightPilot automates back-office tasks and provides real-time insights.</p><h2>10. Ignoring Tax Preparation</h2><p>Quarterly IFTA reporting and annual tax prep should be ongoing processes, not last-minute scrambles. Stay organized year-round.</p><p>By addressing these ten areas, owner-operators and small fleets can significantly improve their profitability and build sustainable businesses.</p>`
    },
    { 
      title: 'How to Improve Fuel Efficiency in Your Fleet', 
      slug: 'how-to-improve-fuel-efficiency',
      excerpt: 'Practical strategies to reduce fuel consumption and lower your operating costs across your entire fleet.',
      content: `<h2>Why Fuel Efficiency Matters</h2><p>With fuel accounting for 25-35% of operating costs, improving fuel efficiency by even 10% can add thousands to your bottom line annually per truck.</p><h2>1. Monitor Tire Pressure</h2><p>Under-inflated tires increase rolling resistance and fuel consumption. Check tire pressure weekly and maintain proper PSI levels.</p><h2>2. Reduce Idling</h2><p>Idling consumes 0.8-1.5 gallons of diesel per hour. Use APUs, bunk heaters, or shore power to reduce unnecessary idling.</p><h2>3. Optimize Speed</h2><p>Every mile per hour over 65 reduces fuel economy. Use cruise control and govern your trucks at optimal speeds.</p><h2>4. Improve Aerodynamics</h2><p>Roof fairings, side skirts, and gap reducers can improve fuel economy by 5-15% at highway speeds.</p><h2>5. Plan Efficient Routes</h2><p>Avoid traffic congestion, construction zones, and steep grades when possible. Use GPS routing designed for commercial vehicles.</p><h2>6. Train Drivers</h2><p>Eco-driving techniques like smooth acceleration, anticipating traffic, and progressive shifting can improve MPG by 5-10%.</p><h2>7. Use Fuel Tracking Software</h2><p>FreightPilot's fuel tracking module helps you monitor fuel costs per mile, identify trends, and spot inefficiencies across your fleet.</p><p>Start implementing these strategies today to see immediate improvements in your fuel economy and operating margins.</p>`
    },
    { 
      title: 'Understanding Driver Settlements: A Complete Guide', 
      slug: 'understanding-driver-settlements',
      excerpt: 'Learn everything you need to know about calculating driver pay, deductions, and settlements for your fleet.',
      content: `<h2>What is a Driver Settlement?</h2><p>A driver settlement is the final pay statement that calculates what a driver earns after all deductions, bonuses, and adjustments for a specific pay period.</p><h2>Common Pay Structures</h2><h3>CPM (Cents Per Mile)</h3><p>The most common pay structure. Drivers earn a fixed rate per mile, typically $0.50-$0.85 depending on experience and market conditions.</p><h3>Percentage-Based Pay</h3><p>Drivers earn a percentage of the load revenue, usually 20-30%. This aligns driver earnings with load profitability.</p><h3>Flat Rate</h3><p>A fixed amount per load regardless of miles or revenue. Common for dedicated routes or specialized freight.</p><h2>Typical Deductions</h2><ul><li><strong>Fuel Advances:</strong> Cash advances for fuel during the trip</li><li><strong>Insurance:</strong> Health, dental, or cargo insurance premiums</li><li><strong>Equipment:</strong> Truck payments or lease deductions</li><li><strong>Compliance:</strong> Drug tests, DOT physicals, and training costs</li><li><strong>Load Costs:</strong> Lumper fees, tolls, and scale fees</li></ul><h2>Bonuses and Incentives</h2><p>Bonuses can include safety bonuses, fuel efficiency bonuses, referral bonuses, and on-time delivery bonuses. These help retain quality drivers.</p><h2>Using FreightPilot for Settlements</h2><p>FreightPilot's settlement calculator automates the entire process, reducing errors and saving hours of manual calculation each week.</p>`
    },
    { 
      title: 'Preparing for DOT Audits: What You Need to Know', 
      slug: 'preparing-for-dot-audits',
      excerpt: 'A comprehensive guide to preparing your trucking business for DOT compliance audits and avoiding violations.',
      content: `<h2>What Triggers a DOT Audit?</h2><p>DOT audits can be triggered by high crash rates, inspection violations, complaints, or random selection. Preparation is the best defense.</p><h2>Types of DOT Audits</h2><h3>Comprehensive Audit</h3><p>A full review of all safety management controls including driver qualifications, vehicle maintenance, and hours of service.</p><h3>Focused Audit</h3><p>Targets specific areas of concern identified through data analysis or previous violations.</p><h3>Roadside Inspection</h3><p>Conducted during a traffic stop or weigh station visit. Focuses on the vehicle and driver at that moment.</p><h2>Documents You Need</h2><ul><li><strong>Driver Qualification Files:</strong> CDL copies, medical certificates, driving records</li><li><strong>Hours of Service Logs:</strong> Current and past 6 months of ELD data</li><li><strong>Vehicle Maintenance Records:</strong> Inspection reports, repair orders, PM schedules</li><li><strong>Drug and Alcohol Testing Records:</strong> Consortium information and test results</li><li><strong>Insurance Certificates:</strong> Current liability and cargo coverage</li></ul><h2>Using FreightPilot's Document Vault</h2><p>FreightPilot's document vault helps you store, organize, and track all compliance documents with expiration alerts so you're always audit-ready.</p><p>Regular document management and proactive compliance will keep your operation running smoothly and avoid costly violations.</p>`
    },
    { 
      title: 'Growing a Small Trucking Fleet: Step by Step', 
      slug: 'growing-a-small-trucking-fleet',
      excerpt: 'A practical roadmap for expanding your trucking operation from one truck to a thriving fleet.',
      content: `<h2>Start with Solid Foundations</h2><p>Before adding trucks, ensure your business operations are streamlined. If you're still using paper logs and spreadsheets, upgrade to modern software first.</p><h2>Step 1: Build Your Reputation</h2><p>Consistent on-time delivery and good customer relationships are your best marketing tools. Focus on service quality before scaling.</p><h2>Step 2: Establish Credit</h2><p>Build business credit, establish relationships with lenders, and have financing in place before you need it. Factor your receivables to improve cash flow.</p><h2>Step 3: Find Good Drivers</h2><p>Drivers are your most valuable asset. Invest in recruiting, competitive pay, and retention programs. A good driver is worth more than three mediocre ones.</p><h2>Step 4: Diversify Customers</h2><p>Don't rely on one broker or shipper. Build a diverse customer base to weather market fluctuations. Use FreightPilot's CRM to manage relationships.</p><h2>Step 5: Scale Strategically</h2><p>Add one truck at a time and ensure each new truck generates profit before adding another. Monitor your KPIs closely with analytics.</p><h2>Step 6: Use Technology</h2><p>FreightPilot grows with you - from Starter Operator to Small Fleet to Growth Fleet. Our platform scales seamlessly as you add trucks, drivers, and customers.</p><p>Growing a fleet takes patience, discipline, and the right tools. With FreightPilot, you have everything you need to manage your growing operation.</p>`
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        published: true,
      }
    });
  }

  // Leads
  for (let i = 0; i < 10; i++) {
    await prisma.lead.create({
      data: {
        email: `lead${i}@example.com`,
        name: `Lead Name ${i}`,
        companyName: `Prospect Fleet ${i}`,
        status: i % 3 === 0 ? 'contacted' : 'new',
        source: 'website',
      }
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
