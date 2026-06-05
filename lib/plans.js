export const PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter Operator',
    price: 19,
    priceId: 'price_starter_monthly',
    description: 'For owner-operators running solo',
    features: [
      '1 Truck',
      'Load Tracking',
      'Expense Tracking',
      'Document Vault',
      'Basic Reports',
    ],
    maxTrucks: 1,
    maxDrivers: 1,
  },
  'small-fleet': {
    id: 'small-fleet',
    name: 'Small Fleet',
    price: 79,
    priceId: 'price_small_fleet_monthly',
    description: 'For small fleets up to 10 trucks',
    features: [
      'Up to 10 Trucks',
      'Driver Settlements',
      'Maintenance Tracking',
      'Invoicing',
      'Fuel Tracking',
      'Load Management',
    ],
    maxTrucks: 10,
    maxDrivers: 15,
  },
  'growth-fleet': {
    id: 'growth-fleet',
    name: 'Growth Fleet',
    price: 199,
    priceId: 'price_growth_fleet_monthly',
    description: 'For growing fleets up to 50 trucks',
    features: [
      'Up to 50 Trucks',
      'AI Assistant',
      'IFTA Reporting',
      'Advanced Analytics',
      'Driver Performance',
      'All Small Fleet Features',
    ],
    maxTrucks: 50,
    maxDrivers: 75,
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    priceId: null,
    description: 'Custom solution for large operations',
    features: [
      'Unlimited Trucks',
      'Custom Integrations',
      'Dedicated Support',
      'Custom Reports',
      'API Access',
      'All Features Included',
    ],
    maxTrucks: Infinity,
    maxDrivers: Infinity,
  },
};

export function getPlanById(planId) {
  return PLANS[planId] || null;
}

export function getPlanLimits(planId) {
  const plan = getPlanById(planId);
  if (!plan) return { maxTrucks: 0, maxDrivers: 0 };
  return { maxTrucks: plan.maxTrucks, maxDrivers: plan.maxDrivers };
}