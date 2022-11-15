import type { NextApiRequest, NextApiResponse } from "next";
import * as sgMail from "@sendgrid/client";
import { newsletterSchema } from "@schemas/newsletterSchema";

export default async (req: NextApiRequest, res: NextApiResponse<string>) => {
  try {
    if (req.method === "PUT") {
      const apiKey = process.env.SENDGRID_API_KEY || "";

      sgMail.setApiKey(apiKey);
      const request = await newsletterSchema.validate(req.body);

      const url = process.env.NEWSLETTER_ENDPOINT;
      const method = "PUT";
      const body = {
        list_ids: [`${process.env.NEWSLETTER_LIST_ID}`],
        contacts: [
          {
            email: `${request.email}`,
          },
        ],
      };

      const data: any = {
        url,
        method,
        body,
      };

      const [sgResponse] = await sgMail.request(data);
      if (sgResponse.statusCode >= 300) {
        throw new Error("Failed");
      }

      res.status(sgResponse.statusCode).send("Success");
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Unable to add to newsletter list");
  }
};
