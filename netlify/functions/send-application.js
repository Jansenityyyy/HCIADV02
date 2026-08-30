// Netlify Function: sends a branded HTML application-notification email via Resend.
// Set RESEND_API_KEY and ADMISSIONS_EMAIL in Netlify → Site settings → Environment variables.

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ success: false, error: 'Method not allowed' }) };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Invalid JSON' }) };
  }

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const row = (label, value) => `
    <tr>
      <td style="padding:4px 0; color:#666666; font-size:13px; width:42%;">${esc(label)}</td>
      <td style="padding:4px 0; color:#111111; font-size:13px;">${esc(value) || '&mdash;'}</td>
    </tr>`;

  const section = (title, rows) => `
    <p style="font-size:13px; font-weight:600; color:#0a2463; margin:20px 0 8px; border-bottom:2px solid #fb8500; padding-bottom:6px;">
      ${esc(title)}
    </p>
    <table style="width:100%; border-collapse:collapse;">${rows}</table>`;

  const html = `
  <div style="font-family: 'DM Sans', Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #eeeeee;">
    <div style="background:#0a2463; padding:24px; text-align:center;">
      <h1 style="color:#ffffff; margin:0; font-size:20px; font-weight:600;">Amore Academy</h1>
      <p style="color:#fb8500; margin:6px 0 0; font-size:13px;">New application received</p>
    </div>
    <div style="padding:24px;">
      ${section('Personal information', [
        row('Name', `${data.firstName || ''} ${data.middleName || ''} ${data.lastName || ''} ${data.suffix || ''}`),
        row('Date of birth', data.dob),
        row('Sex', data.sex),
        row('Nationality', data.nationality),
        row('Address', data.address),
        row('Email', data.email),
        row('Mobile', data.mobile),
      ].join(''))}
      ${section('Parent / guardian', [
        row('Name', data.parentName),
        row('Relationship', data.parentRelationship),
        row('Contact', data.parentContact),
        row('Email', data.parentEmail),
      ].join(''))}
      ${section('Program & level', [
        row('School year', data.schoolYear),
        row('Level', data.level),
        row('Preferred strand', data.strand1),
        row('Second strand preference', data.strand2),
        row('Application type', data.applicationType),
      ].join(''))}
      ${section('Academic background', [
        row('Previous / current school', data.prevSchool),
        row('School address', data.schoolAddress),
        row('Last grade completed', data.lastGrade),
        row('School year completed', data.syCompleted),
        row('General average', data.generalAverage),
        row('Awards / honors', data.awards),
        row('Activities', data.activities),
      ].join(''))}
      <p style="font-size:12px; color:#888888; margin-top:24px;">
        Applicant will email Report Card, PSA Birth Certificate, 2x2 photo, and Good Moral Certificate separately.
      </p>
    </div>
    <div style="background:#f5f5f5; padding:12px; text-align:center;">
      <p style="font-size:11px; color:#888888; margin:0;">Sent from the Amore Academy application form</p>
    </div>
  </div>`;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Amore Academy <onboarding@resend.dev>',
        to: process.env.ADMISSIONS_EMAIL,
        reply_to: data.email || undefined,
        subject: `New application \u2014 ${data.firstName || ''} ${data.lastName || ''}`.trim(),
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend error:', errText);
      return { statusCode: 502, body: JSON.stringify({ success: false, error: 'Email provider error' }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ success: false, error: 'Server error' }) };
  }
};