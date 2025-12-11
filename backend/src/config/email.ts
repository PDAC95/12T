import { Resend } from 'resend';

/**
 * Resend Email Service Configuration
 * Documentation: https://resend.com/docs
 */

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Email configuration
 */
export const emailConfig = {
  // Using Resend's test domain for development
  // Change to 'TALQ <noreply@letstalq.com>' when domain is verified
  from: 'TALQ <onboarding@resend.dev>',
  replyTo: 'support@letstalq.com',
};

/**
 * Send email using Resend
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - HTML email content
 * @returns Promise with send result
 */
export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<{ success: boolean; id?: string; error?: string }> => {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️  RESEND_API_KEY not configured. Email not sent.');
      console.log('📧 Email Preview:');
      console.log(`   To: ${to}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   HTML Length: ${html.length} characters`);
      return {
        success: false,
        error: 'RESEND_API_KEY not configured'
      };
    }

    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error('❌ Error sending email:', error);
      return { success: false, error: error.message };
    }

    console.log(`✅ Email sent successfully to ${to} (ID: ${data?.id})`);
    return { success: true, id: data?.id };

  } catch (error: any) {
    console.error('❌ Email send error:', error);
    return {
      success: false,
      error: error.message || 'Unknown error'
    };
  }
};

/**
 * Send confirmation email to user
 * @param to - User email
 * @param confirmationToken - Email confirmation token
 * @param userName - User's name
 */
export const sendConfirmationEmail = async (
  to: string,
  confirmationToken: string,
  userName: string
): Promise<{ success: boolean; error?: string }> => {
  const confirmationUrl = `${process.env.FRONTEND_URL}/confirm-email/${confirmationToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm Your Email - TALQ</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9f9f9;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #E16449 0%, #ef8277 100%); padding: 40px 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">TALQ</h1>
                  <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">Let's Talq</p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px; color: #181B21; font-size: 24px; font-weight: 600;">¡Hola ${userName}! 👋</h2>

                  <p style="margin: 0 0 16px; color: #181B21; font-size: 16px; line-height: 1.6;">
                    ¡Bienvenido a <strong>TALQ</strong>, tu plataforma de aprendizaje de idiomas!
                  </p>

                  <p style="margin: 0 0 24px; color: #181B21; font-size: 16px; line-height: 1.6;">
                    Para comenzar tu experiencia, por favor confirma tu dirección de email haciendo clic en el botón de abajo:
                  </p>

                  <!-- CTA Button -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="padding: 0 0 24px;">
                        <a href="${confirmationUrl}" style="display: inline-block; background: linear-gradient(135deg, #E16449 0%, #ef8277 100%); color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(225, 100, 73, 0.3);">
                          Confirmar mi Email
                        </a>
                      </td>
                    </tr>
                  </table>

                  <p style="margin: 0 0 16px; color: #868686; font-size: 14px; line-height: 1.6;">
                    O copia y pega este enlace en tu navegador:
                  </p>

                  <p style="margin: 0 0 24px; color: #E16449; font-size: 14px; word-break: break-all;">
                    ${confirmationUrl}
                  </p>

                  <div style="background-color: #fdf5f2; border-left: 4px solid #E16449; padding: 16px; border-radius: 4px; margin: 24px 0;">
                    <p style="margin: 0; color: #181B21; font-size: 14px; line-height: 1.6;">
                      <strong>⏰ Este enlace expira en 24 horas.</strong><br>
                      Si no solicitaste esta cuenta, puedes ignorar este email de manera segura.
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #fdf5f2; padding: 30px 40px; text-align: center; border-top: 1px solid #f1f1f1;">
                  <p style="margin: 0 0 8px; color: #868686; font-size: 14px;">
                    ¿Tienes preguntas? Contáctanos en <a href="mailto:support@letstalq.com" style="color: #E16449; text-decoration: none;">support@letstalq.com</a>
                  </p>
                  <p style="margin: 0; color: #b3b3b3; font-size: 12px;">
                    © 2025 TALQ - Language Learning Platform. Todos los derechos reservados.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const result = await sendEmail(
    to,
    '✉️ Confirma tu email - TALQ',
    html
  );

  return result;
};

export default resend;
