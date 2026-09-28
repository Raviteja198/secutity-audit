import { z } from "zod";

/*
Convert empty string ("") from form inputs
to undefined so optional fields work correctly
*/
const emptyToUndefined = (val: unknown) => {
  if (typeof val === "string" && val.trim() === "") {
    return undefined;
  }
  return val;
};

export const memberCreateSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(200),

  phone: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .min(6, "Phone must be at least 6 digits")
      .max(32)
      .optional()
  ),

  email: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .email("Invalid email address")
      .optional()
  ),

  address: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .max(500)
      .optional()
  ),

  joinDate: z.coerce.date(),
});


// import { z } from "zod";

// /*
// Convert empty string ("") from form inputs
// to undefined so optional fields work correctly
// */
// const emptyToUndefined = (val: unknown) => {
//   if (typeof val === "string" && val.trim() === "") {
//     return undefined;
//   }
//   return val;
// };

// export const memberCreateSchema = z.object({
//   memberUid: z
//     .string()
//     .min(3, "Member ID must be at least 3 characters")
//     .max(32, "Member ID too long"),

//   fullName: z
//     .string()
//     .min(2, "Name must be at least 2 characters")
//     .max(200),

//   phone: z.preprocess(
//     emptyToUndefined,
//     z
//       .string()
//       .min(6, "Phone must be at least 6 digits")
//       .max(32)
//       .optional()
//   ),

//   email: z.preprocess(
//     emptyToUndefined,
//     z
//       .string()
//       .email("Invalid email address")
//       .optional()
//   ),

//   address: z.preprocess(
//     emptyToUndefined,
//     z
//       .string()
//       .max(500)
//       .optional()
//   ),

//   joinDate: z.coerce.date(),
// });

// export const memberUpdateSchema = memberCreateSchema
//   .partial()
//   .extend({
//     status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
//     exitDate: z.coerce.date().nullable().optional(),
//   });


export const memberUpdateSchema = z.object({
  memberUid: z.string().min(3).max(32).optional(),
  fullName: z.string().min(2).max(200).optional(),

  phone: z.preprocess(
    emptyToUndefined,
    z.string().min(6).max(32).optional()
  ),

  email: z.preprocess(
    emptyToUndefined,
    z.string().email().optional()
  ),

  address: z.preprocess(
    emptyToUndefined,
    z.string().max(500).optional()
  ),

  joinDate: z.coerce.date().optional(),

  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),

  exitDate: z.coerce.date().nullable().optional(),
});