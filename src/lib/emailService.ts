import emailjs from "@emailjs/browser";

/**
 * Email Service using EmailJS
 * Handles sending contact form submissions
 */
export async function sendContactEmail(
  name: string,
  email: string,
  message: string
): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS environment variables are not configured");
  }

  const templateParams = {
    name,
    email,
    message,
  };

  await emailjs.send(serviceId, templateId, templateParams, publicKey);
}
