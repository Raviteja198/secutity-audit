type WhatsAppParameterValue = string | number | Date | null | undefined;

type SendWhatsAppMessageInput = {
  to: string;
  templateName: string;
  parameters?: WhatsAppParameterValue[];
};

type WhatsAppConfig = {
  accessToken: string;
  phoneNumberId: string;
  apiVersion: string;
  languageCode: string;
};

function getWhatsAppConfig(): WhatsAppConfig {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();

  if (!accessToken || !phoneNumberId) {
    throw Object.assign(
      new Error("WhatsApp is not configured. Set WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID."),
      { status: 500 }
    );
  }

  return {
    accessToken,
    phoneNumberId,
    apiVersion: process.env.WHATSAPP_API_VERSION?.trim() || "v19.0",
    languageCode: process.env.WHATSAPP_LANGUAGE_CODE?.trim() || "en_US",
  };
}

export async function sendWhatsAppMessage({ to, templateName, parameters = [] }: SendWhatsAppMessageInput) {
  const config = getWhatsAppConfig();
  const url = `https://graph.facebook.com/${config.apiVersion}/${config.phoneNumberId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: config.languageCode },
      components: [
        {
          type: "body",
          parameters: parameters.map((value) => ({
            type: "text",
            text: value instanceof Date ? value.toISOString() : String(value ?? ""),
          })),
        },
      ],
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`WhatsApp API request failed (${response.status}): ${errorText}`);
  }

  return response.json();
}
