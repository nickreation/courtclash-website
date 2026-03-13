import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const toEmail = process.env.NEWSLETTER_TO;
  if (!toEmail) {
    return NextResponse.json(
      { error: 'NEWSLETTER_TO non configuré' },
      { status: 500 }
    );
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'RESEND_API_KEY non configuré' },
      { status: 500 }
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Corps de requête invalide' },
      { status: 400 }
    );
  }

  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: 'Adresse email invalide' },
      { status: 400 }
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Court Clash Newsletter <onboarding@resend.dev>',
      to: [toEmail],
      subject: 'Nouvelle inscription newsletter Court Clash',
      html: `
        <p>Nouvelle inscription à la newsletter :</p>
        <p><strong>${email.replace(/[<>]/g, '')}</strong></p>
        <p><em>Envoyé depuis le formulaire du site Court Clash.</em></p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi' },
      { status: 500 }
    );
  }
}
