import type { NextApiRequest, NextApiResponse } from "next";
import * as sgMail from "@sendgrid/mail";
import { feedbackSchema } from "@schemas/feedbackSchema";

export default async (req: NextApiRequest, res: NextApiResponse<string>) => {
  try {
    if (req.method === "POST") {
      const apiKey = process.env.SENDGRID_API_KEY || "";

      sgMail.setApiKey(apiKey);
      const body = await feedbackSchema.validate(req.body);

      const feedbackMessage = `
          Name: ${body.name}\r\n
          Email: ${body.email}\r\n
          Feedback: ${body.feedback}
        `;

      const data: any = {
        to: process.env.TO_EDDE_EMAIL,
        from: process.env.FROM_EDDE_EMAIL,
        subject: `EDDE Feedback from ${body.name} at ${body.email}`,
        text: feedbackMessage.replace(/\n\r/g, `<br>`),
      };

      const [sgResponse] = await sgMail.send(data);
      if (sgResponse.statusCode >= 300) {
        throw new Error("Failed");
      }

      res.status(sgResponse.statusCode).send("Success");
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Unable to send feedback");
  }
};
