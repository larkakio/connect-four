import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log webhook events for debugging
    console.log('Webhook received:', body);
    
    // Handle different event types if needed
    // For now, just acknowledge receipt
    
    return NextResponse.json({ 
      success: true,
      message: 'Webhook received' 
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Invalid webhook payload' },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    service: 'Connect Four Neon Gravity Webhook'
  });
}
