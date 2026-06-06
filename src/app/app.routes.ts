import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'video-tutorials-latest',
    loadComponent: () => import('./tabs/video-tutorials-latest/video-tutorials-latest.component').then((m) => m.VideoTutorialsLatestComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./tabs/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'students',
    loadComponent: () => import('./tabs/students/students.component').then((m) => m.StudentsComponent),
    children: [
      { path: 'active-students', loadComponent: () => import('./tabs/students/active-students/active-students.component').then((m) => m.ActiveStudentsComponent) },
      { path: 'admission-form', loadComponent: () => import('./tabs/students/admission-form/admission-form.component').then((m) => m.AdmissionFormComponent) },
      { path: 'admission-inquiry', loadComponent: () => import('./tabs/students/admission-inquiry/admission-inquiry.component').then((m) => m.AdmissionInquiryComponent) },
      { path: 'new-admission', loadComponent: () => import('./tabs/students/new-admission/new-admission.component').then((m) => m.NewAdmissionComponent) },
      { path: 'student-cards', loadComponent: () => import('./tabs/students/student-cards/student-cards.component').then((m) => m.StudentCardsComponent) },
      { path: 'student-certificates', loadComponent: () => import('./tabs/students/student-certificates/student-certificates.component').then((m) => m.StudentCertificatesComponent) },
      { path: 'withdrawal-students', loadComponent: () => import('./tabs/students/withdrawal-students/withdrawal-students.component').then((m) => m.WithdrawalStudentsComponent) },
      { path: '', redirectTo: 'active-students', pathMatch: 'full' },
    ],
  },
  {
    path: 'students-attendance',
    loadComponent: () => import('./tabs/students-attendance/students-attendance.component').then((m) => m.StudentsAttendanceComponent),
    children: [
      { path: 'attendance-reports', loadComponent: () => import('./tabs/students-attendance/attendance-reports/attendance-reports.component').then((m) => m.AttendanceReportsComponent) },
      { path: 'edit-attendance', loadComponent: () => import('./tabs/students-attendance/edit-attendance/edit-attendance.component').then((m) => m.EditAttendanceComponent) },
      { path: 'mark-attendance', loadComponent: () => import('./tabs/students-attendance/mark-attendance/mark-attendance.component').then((m) => m.MarkAttendanceComponent) },
      { path: 'send-attendance-sms', loadComponent: () => import('./tabs/students-attendance/send-attendance-sms/send-attendance-sms.component').then((m) => m.SendAttendanceSmsComponent) },
      { path: '', redirectTo: 'attendance-reports', pathMatch: 'full' },
    ],
  },
  {
    path: 'fee-management',
    loadComponent: () => import('./tabs/fee-management/fee-management.component').then((m) => m.FeeManagementComponent),
    children: [
      { path: 'collect-fee-family-wise', loadComponent: () => import('./tabs/fee-management/collect-fee-family-wise/collect-fee-family-wise.component').then((m) => m.CollectFeeFamilyWiseComponent) },
      { path: 'collect-fee-student-wise', loadComponent: () => import('./tabs/fee-management/collect-fee-student-wise/collect-fee-student-wise.component').then((m) => m.CollectFeeStudentWiseComponent) },
      { path: 'create-bulk-challans', loadComponent: () => import('./tabs/fee-management/create-bulk-challans/create-bulk-challans.component').then((m) => m.CreateBulkChallansComponent) },
      { path: 'create-single-challan', loadComponent: () => import('./tabs/fee-management/create-single-challan/create-single-challan.component').then((m) => m.CreateSingleChallanComponent) },
      { path: 'fee-arrears', loadComponent: () => import('./tabs/fee-management/fee-arrears/fee-arrears.component').then((m) => m.FeeArrearsComponent) },
      { path: 'fee-defaulters', loadComponent: () => import('./tabs/fee-management/fee-defaulters/fee-defaulters.component').then((m) => m.FeeDefaultersComponent) },
      { path: 'fee-reports', loadComponent: () => import('./tabs/fee-management/fee-reports/fee-reports.component').then((m) => m.FeeReportsComponent) },
      { path: 'fee-types', loadComponent: () => import('./tabs/fee-management/fee-types/fee-types.component').then((m) => m.FeeTypesComponent) },
      { path: 'revert-bulk-challans', loadComponent: () => import('./tabs/fee-management/revert-bulk-challans/revert-bulk-challans.component').then((m) => m.RevertBulkChallansComponent) },
      { path: 'revert-single-challan', loadComponent: () => import('./tabs/fee-management/revert-single-challan/revert-single-challan.component').then((m) => m.RevertSingleChallanComponent) },
      { path: '', redirectTo: 'collect-fee-family-wise', pathMatch: 'full' },
    ],
  },
  {
    path: 'fines-management',
    loadComponent: () => import('./tabs/fines-management/fines-management.component').then((m) => m.FinesManagementComponent),
    children: [
      { path: 'custom-fines', loadComponent: () => import('./tabs/fines-management/custom-fines/custom-fines.component').then((m) => m.CustomFinesComponent) },
      { path: 'custom-fine-types', loadComponent: () => import('./tabs/fines-management/custom-fine-types/custom-fine-types.component').then((m) => m.CustomFineTypesComponent) },
      { path: 'default-fines', loadComponent: () => import('./tabs/fines-management/default-fines/default-fines.component').then((m) => m.DefaultFinesComponent) },
      { path: '', redirectTo: 'custom-fines', pathMatch: 'full' },
    ],
  },
  {
    path: 'expense',
    loadComponent: () => import('./tabs/expense/expense.component').then((m) => m.ExpenseComponent),
    children: [
      { path: 'custom-expense', loadComponent: () => import('./tabs/expense/custom-expense/custom-expense.component').then((m) => m.CustomExpenseComponent) },
      { path: 'custom-expense-types', loadComponent: () => import('./tabs/expense/custom-expense-types/custom-expense-types.component').then((m) => m.CustomExpenseTypesComponent) },
      { path: 'default-expense', loadComponent: () => import('./tabs/expense/default-expense/default-expense.component').then((m) => m.DefaultExpenseComponent) },
      { path: '', redirectTo: 'custom-expense', pathMatch: 'full' },
    ],
  },
  {
    path: 'income',
    loadComponent: () => import('./tabs/income/income.component').then((m) => m.IncomeComponent),
    children: [
      { path: 'balance-summary', loadComponent: () => import('./tabs/income/balance-summary/balance-summary.component').then((m) => m.BalanceSummaryComponent) },
      { path: 'custom-income', loadComponent: () => import('./tabs/income/custom-income/custom-income.component').then((m) => m.CustomIncomeComponent) },
      { path: 'custom-income-types', loadComponent: () => import('./tabs/income/custom-income-types/custom-income-types.component').then((m) => m.CustomIncomeTypesComponent) },
      { path: 'default-income', loadComponent: () => import('./tabs/income/default-income/default-income.component').then((m) => m.DefaultIncomeComponent) },
      { path: '', redirectTo: 'balance-summary', pathMatch: 'full' },
    ],
  },
  {
    path: 'staff',
    loadComponent: () => import('./tabs/staff/staff.component').then((m) => m.StaffComponent),
    children: [
      { path: 'staff-cards', loadComponent: () => import('./tabs/staff/staff-cards/staff-cards.component').then((m) => m.StaffCardsComponent) },
      { path: 'staff-certificates', loadComponent: () => import('./tabs/staff/staff-certificates/staff-certificates.component').then((m) => m.StaffCertificatesComponent) },
      { path: 'staff-list', loadComponent: () => import('./tabs/staff/staff-list/staff-list.component').then((m) => m.StaffListComponent) },
      { path: '', redirectTo: 'staff-cards', pathMatch: 'full' },
    ],
  },
  {
    path: 'staff-attendance',
    loadComponent: () => import('./tabs/staff-attendance/staff-attendance.component').then((m) => m.StaffAttendanceComponent),
    children: [
      { path: 'update-attendance', loadComponent: () => import('./tabs/staff-attendance/update-attendance/update-attendance.component').then((m) => m.UpdateAttendanceComponent) },
      { path: '', redirectTo: 'update-attendance', pathMatch: 'full' },
    ],
  },
  {
    path: 'staff-payroll',
    loadComponent: () => import('./tabs/staff-payroll/staff-payroll.component').then((m) => m.StaffPayrollComponent),
    children: [
      { path: 'advance-salary', loadComponent: () => import('./tabs/staff-payroll/advance-salary/advance-salary.component').then((m) => m.AdvanceSalaryComponent) },
      { path: 'custom-deduction', loadComponent: () => import('./tabs/staff-payroll/custom-deduction/custom-deduction.component').then((m) => m.CustomDeductionComponent) },
      { path: 'deduction-rules', loadComponent: () => import('./tabs/staff-payroll/deduction-rules/deduction-rules.component').then((m) => m.DeductionRulesComponent) },
      { path: 'payroll-list', loadComponent: () => import('./tabs/staff-payroll/payroll-list/payroll-list.component').then((m) => m.PayrollListComponent) },
      { path: 'roll-back-payroll', loadComponent: () => import('./tabs/staff-payroll/roll-back-payroll/roll-back-payroll.component').then((m) => m.RollBackPayrollComponent) },
      { path: 'staff-allowances', loadComponent: () => import('./tabs/staff-payroll/staff-allowances/staff-allowances.component').then((m) => m.StaffAllowancesComponent) },
      { path: '', redirectTo: 'advance-salary', pathMatch: 'full' },
    ],
  },
  {
    path: 'examination',
    loadComponent: () => import('./tabs/examination/examination.component').then((m) => m.ExaminationComponent),
    children: [
      { path: 'add-subjects', loadComponent: () => import('./tabs/examination/add-subjects/add-subjects.component').then((m) => m.AddSubjectsComponent) },
      { path: 'date-sheet', loadComponent: () => import('./tabs/examination/date-sheet/date-sheet.component').then((m) => m.DateSheetComponent) },
      { path: 'exams-groups', loadComponent: () => import('./tabs/examination/exams-groups/exams-groups.component').then((m) => m.ExamsGroupsComponent) },
      { path: 'exams-list', loadComponent: () => import('./tabs/examination/exams-list/exams-list.component').then((m) => m.ExamsListComponent) },
      { path: 'exams-marks', loadComponent: () => import('./tabs/examination/exams-marks/exams-marks.component').then((m) => m.ExamsMarksComponent) },
      { path: 'exams-result', loadComponent: () => import('./tabs/examination/exams-result/exams-result.component').then((m) => m.ExamsResultComponent) },
      { path: 'print-exam-slips', loadComponent: () => import('./tabs/examination/print-exam-slips/print-exam-slips.component').then((m) => m.PrintExamSlipsComponent) },
      { path: 'syllabus', loadComponent: () => import('./tabs/examination/syllabus/syllabus.component').then((m) => m.SyllabusComponent) },
      { path: '', redirectTo: 'add-subjects', pathMatch: 'full' },
    ],
  },
  {
    path: 'classes-and-sections',
    loadComponent: () => import('./tabs/classes-and-sections/classes-and-sections.component').then((m) => m.ClassesAndSectionsComponent),
    children: [
      { path: 'classes', loadComponent: () => import('./tabs/classes-and-sections/classes/classes.component').then((m) => m.ClassesComponent) },
      { path: 'sections', loadComponent: () => import('./tabs/classes-and-sections/sections/sections.component').then((m) => m.SectionsComponent) },
      { path: '', redirectTo: 'classes', pathMatch: 'full' },
    ],
  },
  {
    path: 'lms',
    loadComponent: () => import('./tabs/lms/lms.component').then((m) => m.LmsComponent),
    children: [
      { path: 'assignments', loadComponent: () => import('./tabs/lms/assignments/assignments.component').then((m) => m.AssignmentsComponent) },
      { path: 'daily-diary', loadComponent: () => import('./tabs/lms/daily-diary/daily-diary.component').then((m) => m.DailyDiaryComponent) },
      { path: 'printsend-diary', loadComponent: () => import('./tabs/lms/printsend-diary/printsend-diary.component').then((m) => m.PrintsendDiaryComponent) },
      { path: 'videos', loadComponent: () => import('./tabs/lms/videos/videos.component').then((m) => m.VideosComponent) },
      { path: '', redirectTo: 'assignments', pathMatch: 'full' },
    ],
  },
  {
    path: 'send-general-message',
    loadComponent: () => import('./tabs/send-general-message/send-general-message.component').then((m) => m.SendGeneralMessageComponent),
  },
  {
    path: 'promote-and-demote',
    loadComponent: () => import('./tabs/promote-and-demote/promote-and-demote.component').then((m) => m.PromoteAndDemoteComponent),
  },
  {
    path: 'sessions',
    loadComponent: () => import('./tabs/sessions/sessions.component').then((m) => m.SessionsComponent),
  },
  {
    path: 'users-and-rights',
    loadComponent: () => import('./tabs/users-and-rights/users-and-rights.component').then((m) => m.UsersAndRightsComponent),
  },
  {
    path: 'settings',
    loadComponent: () => import('./tabs/settings/settings.component').then((m) => m.SettingsComponent),
  },
  {
    path: 'messages',
    loadComponent: () => import('./tabs/messages/messages.component').then((m) => m.MessagesComponent),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
