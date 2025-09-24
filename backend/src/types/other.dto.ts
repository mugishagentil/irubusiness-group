import { z } from "zod";

// Step 1 enums
const languageEnum = z.enum(["English", "Kinyarwanda", "French", "Swahili", "Other"]);
const sensitivityEnum = z.enum(["No", "Yes", "Unsure"]);
const formatEnum = z.enum(["InStudio", "OnLocation", "Remote", "NoPreference"]);
const durationEnum = z.enum(["Min10to15", "Min20to30", "Min45to60", "Over60"]);
const travelEnum = z.enum(["Yes", "No", "Maybe"]);

const partnerTypeEnum = z.enum(["Individual", "Corporate", "StrategicNonEquity", "Other"]);
const boardRepresentationEnum = z.enum(["None", "Observer", "OneSeat", "MultipleSeats"]);
const roleTypeEnum = z.enum(["PassiveInvestor", "ActivePartnerManagement", "StrategicAdvisor", "TechnicalLead"]);
const dividendPreferenceEnum = z.enum(["Reinvest", "QuarterlyCash", "AnnualCash", "ConvertibleInstruments"]);
const presenceTypeEnum = z.enum(["FullyRemote", "OccasionalVisits", "OnSiteLocal"]);


export const createInterviewApplicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  city: z.string().optional(),
  language: languageEnum.optional(),
  timezone: z.string().optional(),
  socials: z.string().optional(),
  headline: z.string().max(120),
  portraitUrl: z.any().optional(),

  contentTypes: z.any().optional(), // JSON array
  pitch: z.string(),
  sensitivity: sensitivityEnum.optional(),
  sampleLinks: z.string().optional(),
  suggestedQuestions: z.string().optional(),

  channels: z.any(), // JSON array
  allChannelsReason: z.string().optional(),
  format: formatEnum.optional(),
  duration: durationEnum.optional(),

  availability: z.string().datetime().optional(),
  travel: travelEnum.optional(),
  tech: z.string().optional(),
  notes: z.string().optional(),

  consentPublish: z.boolean(),
  consentRules: z.boolean(),
  consentContact: z.boolean().optional(),
  signatureUrl: z.any().optional(),
  uploadDocsUrls: z.any().optional(), // JSON array
});

export type CreateInterviewApplicationInput = z.infer<typeof createInterviewApplicationSchema>;

export const createPartnershipApplicationSchema = z.object({
  appName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  country: z.string(),
  type: partnerTypeEnum,
  project: z.string(),
  summary: z.string(),
  amount: z.number(),
  equity: z.number(),
  nonCash: z.array(z.string()).optional(),
  contribOther: z.string().optional(),
  board: boardRepresentationEnum,
  veto: z.string().optional(),
  roleType: roleTypeEnum,
  kpis: z.string().optional(),
  dividend: dividendPreferenceEnum,
  exit: z.string().optional(),
  docs: z.array(z.string()).optional(),
  ip: z.string().optional(),
  ethics: z.string().optional(),
  timeline: z.string().optional(),
  presence: presenceTypeEnum,
  team: z.string().optional(),
  signature: z.any().optional(),
  agree: z.boolean(),
});

export type CreatePartnershipApplicationInput = z.infer<typeof createPartnershipApplicationSchema>;

export const createProjectSchema = z.object({
  title: z.string().min(2),
  client: z.string().min(2),
  description: z.string(),
  status: z.enum(["planning", "active", "completed", "onHold"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  budget: z.number().positive().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  category: z.string().min(2),
  progress: z.number().min(0).max(100).optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;