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
    req.validationData = req.validationData || {};
    for (const { schema, source } of schemas) {
      const input = req[source];
      const result = schema.safeParse(input);

      if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        return res.status(400).json({
          success: false,
          message: errors,
          foo: "hello",
        });
      }
      Object.assign(req.validationData, result.data);
    }
    next();
  };
}
