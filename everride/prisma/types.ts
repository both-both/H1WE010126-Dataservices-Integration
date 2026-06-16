export type FieldType = "string" | "number" | "boolean" | "date";
export type FieldTypeMap = Record<string, FieldType>;

export const fieldTypes = {
  user: {
    id: "number",
    firstname: "string",
    lastname: "string",
    email: "string",
    password: "string",
    role: "string",
    isActive: "boolean",
  },
  brand: {
    id: "number",
    name: "string",
    logoUrl: "string",
  },
  category: {
    id: "number",
    name: "string",
  },
  car: {
    id: "number",
    title: "string",
    year: "number",
    categoryId: "number",
    brandId: "number",
    featureId: "number",
    price: "number",
    isActive: "boolean",
    createdAt: "date",
  },
  feature: {
    id: "number",
    name: "string",
  },
  carFeatureRel: {
    id: "number",
    carId: "number",
    featureId: "number",
  },
} satisfies Record<string, FieldTypeMap>;
