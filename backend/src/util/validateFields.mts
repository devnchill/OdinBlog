import type { NextFunction, Request, Response } from "express";
import type z from "zod";

type TSource = "query" | "params" | "body" | "user";

type SchemaWithSource = {
  schema: z.ZodTypeAny;
  source: TSource;
};

export default function validateFields(schemas: SchemaWithSource[]) {
  return (
    req: Request & { validationData?: Record<string, unknown> },
    res: Response,
    next: NextFunction,
  ) => {
    req.validationData = {};
    for (const { schema, source } of schemas) {
      const input = req[source];
      const result = schema.safeParse(input);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.error.issues,
        });
      }
      Object.assign(req.validationData, result.data);
    }
    next();
  };
}
