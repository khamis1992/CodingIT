import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { stripe } from '@/lib/stripe'

export async function GET() {
  const supabase = createServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const { data: teamData } = await supabase
    .from('users_teams')
    .select('teams (stripe_customer_id)')
    .eq('user_id', user.id)
    .eq('is_default', true)
    .single()

  const customerId = (teamData?.teams as any)?.stripe_customer_id

  if (!customerId) {
    return NextResponse.json({ usage: [] })
  }

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      expand: ['data.items'],
    })

    if (!subscriptions.data.length) {
      return NextResponse.json({ usage: [] })
    }

    const subscription = subscriptions.data[0]
    const usage = subscription.items.data.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: {
        id: (item.price as any).id,
        unit_amount: (item.price as any).unit_amount,
        currency: (item.price as any).currency,
        product: (item.price as any).product,
      },
    }))

    return NextResponse.json({ usage })
  } catch (error) {
    console.error('Error fetching Stripe subscription usage:', error)
    return NextResponse.json({ error: 'Failed to fetch subscription usage' }, { status: 500 })
  }
}
