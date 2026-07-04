export interface WishlistData {
  workEmail?: string | null;
  phoneNumber?: string | null;
  monthlyCustomers?: number | null;
  numberOfBranches?: number | null;
  currentSoftware?: string | null;
  canScheduleDemo?: boolean;
  interestedInBeta?: boolean;
  expectedBudget?: string | null;
}

export function calculateLeadScore(data: WishlistData): number {
  let score = 0;

  if (data.workEmail) score += 10;
  if (data.phoneNumber) score += 10;
  if (data.monthlyCustomers && data.monthlyCustomers > 100) score += 15;
  if (data.numberOfBranches && data.numberOfBranches > 2) score += 15;
  if (data.currentSoftware) score += 10;
  if (data.canScheduleDemo) score += 20;
  if (data.interestedInBeta) score += 20;
  if (data.expectedBudget) score += 10;

  return Math.min(score, 100);
}
