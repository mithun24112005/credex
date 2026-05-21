"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuditTool, CompanyStage, PrimaryUseCase } from "@/types";

type AuditState = {
  currentStep: number;
  teamSize: number;
  companyStage: CompanyStage | "";
  useCase: PrimaryUseCase | "";
  tools: AuditTool[];
  totalMonthlySpend: number;
  estimatedYearlySpend: number;
  setTeamContext: (values: {
    teamSize: number;
    companyStage: CompanyStage;
    useCase: PrimaryUseCase;
  }) => void;
  addTool: (tool: Omit<AuditTool, "id">) => void;
  updateTool: (id: string, tool: Partial<Omit<AuditTool, "id">>) => void;
  removeTool: (id: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCurrentStep: (step: number) => void;
  resetAudit: () => void;
};

const calculateTotals = (tools: AuditTool[]) => {
  const totalMonthlySpend = tools.reduce(
    (total, tool) => total + Number(tool.monthlySpend || 0),
    0
  );

  return {
    totalMonthlySpend,
    estimatedYearlySpend: totalMonthlySpend * 12
  };
};

const initialState = {
  currentStep: 1,
  teamSize: 5,
  companyStage: "" as const,
  useCase: "" as const,
  tools: [],
  totalMonthlySpend: 0,
  estimatedYearlySpend: 0
};

export const useAuditStore = create<AuditState>()(
  persist(
    (set) => ({
      ...initialState,
      setTeamContext: (values) => set(values),
      addTool: (tool) =>
        set((state) => {
          const tools = [
            ...state.tools,
            {
              ...tool,
              id:
                typeof crypto !== "undefined" && "randomUUID" in crypto
                  ? crypto.randomUUID()
                  : `${Date.now()}-${Math.random()}`
            }
          ];

          return {
            tools,
            ...calculateTotals(tools)
          };
        }),
      updateTool: (id, tool) =>
        set((state) => {
          const tools = state.tools.map((item) =>
            item.id === id ? { ...item, ...tool } : item
          );

          return {
            tools,
            ...calculateTotals(tools)
          };
        }),
      removeTool: (id) =>
        set((state) => {
          const tools = state.tools.filter((tool) => tool.id !== id);

          return {
            tools,
            ...calculateTotals(tools)
          };
        }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      setCurrentStep: (step) => set({ currentStep: Math.min(Math.max(step, 1), 4) }),
      resetAudit: () => set(initialState)
    }),
    {
      name: "stackpilot-audit",
      partialize: (state) => ({
        currentStep: state.currentStep,
        teamSize: state.teamSize,
        companyStage: state.companyStage,
        useCase: state.useCase,
        tools: state.tools,
        totalMonthlySpend: state.totalMonthlySpend,
        estimatedYearlySpend: state.estimatedYearlySpend
      })
    }
  )
);
