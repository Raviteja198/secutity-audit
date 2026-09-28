CREATE INDEX "Payment_status_year_month_idx" ON "Payment"("status", "year", "month");
CREATE INDEX "Payment_memberId_status_year_month_idx" ON "Payment"("memberId", "status", "year", "month");
CREATE INDEX "Loan_memberId_status_idx" ON "Loan"("memberId", "status");
CREATE INDEX "LoanInstallment_loanId_dueDate_idx" ON "LoanInstallment"("loanId", "dueDate");
