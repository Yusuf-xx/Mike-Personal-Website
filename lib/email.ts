import nodemailer from 'nodemailer';

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'hello@olakunleogunjimi.com';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export type ContactEmailPayload = {
  name: string;
  email: string;
  message: string;
};

/**
 * Sends the contact form submission to the configured inbox via SMTP.
 * Returns null if SMTP is not configured; otherwise returns { success: boolean, error?: string }.
 */
export async function sendContactEmail(payload: ContactEmailPayload): Promise<
  | { success: true }
  | { success: false; error: string }
> {
  const transporter = getTransporter();
  if (!transporter) {
    return {
      success: false,
      error: 'SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in your environment.',
    };
  }

  try {
    const fromAddress = payload.name.trim()
      ? `"${payload.name.replace(/"/g, '')}" <${payload.email}>`
      : payload.email;

    await transporter.sendMail({
      from: fromAddress,
      to: CONTACT_TO_EMAIL,
      replyTo: payload.email,
      subject: `Contact form: ${payload.name}`,
      text: [
        `From: ${payload.name} <${payload.email}>`,
        '',
        payload.message,
      ].join('\n'),
      html: [
        `<p><strong>From:</strong> ${escapeHtml(payload.name)} &lt;${escapeHtml(payload.email)}&gt;</p>`,
        '<p><strong>Message:</strong></p>',
        `<p>${escapeHtml(payload.message).replace(/\n/g, '<br>')}</p>`,
      ].join('\n'),
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send email';
    return { success: false, error: message };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
