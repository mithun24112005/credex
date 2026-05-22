import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const ToolSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    plan: { type: String, required: true },
    monthlySpend: { type: Number, required: true, min: 0 },
    seats: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const RecommendationSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    severity: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    reasoning: { type: String, required: true },
    affectedTools: [{ type: String }],
    monthlySavings: { type: Number, required: true, min: 0 },
    annualSavings: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const AuditSchema = new Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    teamSize: { type: Number, required: true, min: 1 },
    companyStage: { type: String, required: true },
    useCase: { type: String, required: true },
    tools: { type: [ToolSchema], required: true },
    currentMonthlySpend: { type: Number, required: true, min: 0 },
    optimizedMonthlySpend: { type: Number, required: true, min: 0 },
    monthlySavings: { type: Number, required: true, min: 0 },
    annualSavings: { type: Number, required: true, min: 0 },
    optimizationScore: { type: Number, required: true, min: 0, max: 100 },
    recommendations: { type: [RecommendationSchema], default: [] },
    spendBreakdown: { type: [Schema.Types.Mixed], default: [] },
    toolAnalysis: { type: [Schema.Types.Mixed], default: [] },
    savingsOpportunities: { type: [Schema.Types.Mixed], default: [] },
    aiSummary: {
      headline: { type: String, required: true },
      body: { type: String, required: true }
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type AuditDocument = InferSchemaType<typeof AuditSchema>;

export const AuditModel =
  (mongoose.models.Audit as Model<AuditDocument>) ??
  mongoose.model<AuditDocument>("Audit", AuditSchema);
