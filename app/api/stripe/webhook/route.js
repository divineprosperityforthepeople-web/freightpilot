import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const payload = await request.text();
    // In a real app, you'd verify the signature and handle events
    // const event = stripe.webhooks.constructEvent(payload, sig, secret);
    
    console.log('Stripe Webhook received:', payload);
    
    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
}
