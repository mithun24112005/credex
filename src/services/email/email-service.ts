type ReportEmailPayload = {
  email: string;
  publicId: string;
};

export async function queueReportEmail(payload: ReportEmailPayload) {
  void payload;

  return {
    queued: false,
    provider: "mock"
  };
}
