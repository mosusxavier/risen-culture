import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const paymentId = String(body.razorpay_payment_id || '');
    const orderId = String(body.razorpay_order_id || '');
    const signature = String(body.razorpay_signature || '');

    if (!paymentId || !orderId || !signature) {
      return NextResponse.json({ error: 'Missing required payment fields.' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || '';
    if (!secret) {
      return NextResponse.json({ error: 'Razorpay secret not configured.' }, { status: 500 });
    }

    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (generatedSignature !== signature) {
      return NextResponse.json({ error: 'Payment verification failed. Signature mismatch.' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Unable to verify payment.' }, { status: 500 });
  }
}
