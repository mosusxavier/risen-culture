import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpayKeyId = process.env.RAZORPAY_KEY_ID?.trim();
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

const razorpay = razorpayKeyId && razorpayKeySecret
  ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
  : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const amount = Number(body.amount);
    const currency = String(body.currency || 'INR');
    const receipt = String(body.receipt || `rc-${Date.now()}`);

    if (!amount || amount < 100) {
      return NextResponse.json({ error: 'Amount must be at least 100 paise.' }, { status: 400 });
    }

    if (!razorpay) {
      return NextResponse.json({ error: 'Razorpay credentials are not configured.' }, { status: 500 });
    }

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      payment_capture: true,
    });

    return NextResponse.json({ order_id: order.id, amount: order.amount, currency: order.currency });
  } catch (error: any) {
    if (error?.statusCode === 401) {
      return NextResponse.json({ error: 'Razorpay authentication failed.' }, { status: 401 });
    }

    return NextResponse.json({ error: error?.message || 'Unable to create Razorpay order.' }, { status: 500 });
  }
}
