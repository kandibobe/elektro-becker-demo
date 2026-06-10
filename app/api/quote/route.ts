import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@lib/rate-limit';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(150),
  phone: z.string().min(7).max(30),
  service: z.string().min(1).max(200),
  message: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
});

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Zu viele Anfragen. Bitte warten Sie einen Moment.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const data = schema.parse(body);

    // Honeypot: bots fill hidden fields, humans don't
    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const recipientEmail = process.env.ELECTRICIAN_EMAIL || 'info@elektro-becker-demo.example';
    const fromEmail = process.env.QUOTE_EMAIL_FROM || 'onboarding@resend.dev';

    if (!resend || !process.env.RESEND_API_KEY) {
      console.info('[Quote] Mock email:', data);
      return NextResponse.json({ success: true, id: 'mock' });
    }

    const { error } = await resend.emails.send({
      from: `Elektro Becker Anfrage <${fromEmail}>`,
      to: [recipientEmail],
      subject: `Neue Anfrage: ${data.name} — ${data.service}`,
      text: `
Neue Angebotsanfrage

Name:       ${data.name}
E-Mail:     ${data.email}
Telefon:    ${data.phone}
Leistung:   ${data.service}
Nachricht:  ${data.message || '—'}
      `.trim(),
      html: `
<div style="font-family: Inter, system-ui, sans-serif; max-width: 540px; margin: 0 auto; color: #1e293b;">
  <div style="background: #1e40af; padding: 24px 32px; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 20px;">Neue Angebotsanfrage</h1>
    <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">Elektro Becker GmbH</p>
  </div>
  <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 110px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${escHtml(data.name)}</td></tr>
      <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">E-Mail</td><td style="padding: 8px 0; font-weight: 600;"><a href="mailto:${escHtml(data.email)}" style="color: #1e40af;">${escHtml(data.email)}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Telefon</td><td style="padding: 8px 0; font-weight: 600;"><a href="tel:${escHtml(data.phone)}" style="color: #1e40af;">${escHtml(data.phone)}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Leistung</td><td style="padding: 8px 0; font-weight: 600;">${escHtml(data.service)}</td></tr>
      ${data.message ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;">Nachricht</td><td style="padding: 8px 0;">${escHtml(data.message)}</td></tr>` : ''}
    </table>
  </div>
</div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', issues: err.issues }, { status: 422 });
    }
    console.error('[Quote] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
