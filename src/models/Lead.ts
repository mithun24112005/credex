import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const LeadSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, trim: true },
    role: { type: String, trim: true },
    auditId: { type: String, required: true, index: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

LeadSchema.index({ email: 1, auditId: 1 }, { unique: true });

export type LeadDocument = InferSchemaType<typeof LeadSchema>;

export const LeadModel =
  (mongoose.models.Lead as Model<LeadDocument>) ??
  mongoose.model<LeadDocument>("Lead", LeadSchema);
