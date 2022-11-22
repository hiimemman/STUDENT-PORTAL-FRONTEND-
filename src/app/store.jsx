import { configureStore } from '@reduxjs/toolkit'
import studentInfo from '../slice/StudentSession/studentSession'
import userInfo from '../slice/UserSession/userSession'
import menuState from '../slice/MenuSlice/MenuState'
import formState from '../slice/FormSlice/FormSlice'
import formType from '../slice/FormType/FormType'
import themeMode from '../slice/ThemeMode/ThemeMode'
import pageState from '../slice/PageSlice/PageSlice'
import employeeSelect from '../slice/FormSelectedRow/EmployeeSelected'
import openEmployeeTable from '../slice/Snackbars/EmployeeTableOpen/EmployeeTableOpen'
import statusEmployeeTable from '../slice/Snackbars/EmployeeTableStatus/EmployeeTableStatus'
import messageEmployeeTable from '../slice/Snackbars/EmployeeTableMessage/EmployeeTableMessage'
import addFormFor from '../slice/AddFormSlice/AddEmployeeSlice/AddEmployeeSlice'
import  subjectSelect  from  '../slice/FormSelectedRow/SubjectSelected'
import addFormSub from '../slice/AddFormSlice/AddSubjectSlice/AddSubjectSlice'
import addFaculty from '../slice/AddFormSlice/AddFacultySlice/AddFacultySlice'
import addCourse from '../slice/AddFormSlice/AddCourseSlice/AddCourseSlice'
import addSection from '../slice/AddFormSlice/AddSectionSlice/AddSectionSlice'
import sectionSelect from '../slice/FormSelectedRow/SectionSelected'
import addProfessor from '../slice/AddFormSlice/AddProfessorSlice/AddProfessorSlice'
import professorSelect from '../slice/FormSelectedRow/ProfessorSelected'
import studentSelect from '../slice/FormSelectedRow/StudentSelected'
import addStudent from '../slice/AddFormSlice/AddStudentSlice/AddStudentSlice'
import menuStudentState from '../slice/MenuSlice/MenuState';
import studentPageState from '../slice/StudentPageSlice/StudentPageSlice';
import scheduleSelection from '../slice/AddSchedule/AddScheduleSlice';
import  addFormFees  from '../slice/AddFormSlice/AddFeeSlice/AddFeeSlice';
import  feeSelection  from '../slice/AddFeeSlice/AddFeeSlice'
import addFormAcadYear from '../slice/AddFormSlice/AddAcademicYearSlice/AddAcademicYear';
import  addFormAnnouncement  from '../slice/AddFormSlice/AddAnnouncementSlice/AddAnnouncementSlice'

export const store = configureStore({
  reducer: {
    user: userInfo,
    student: studentInfo,
    isOpen: menuState,
    isOpenStudent: menuStudentState,
    isOpenForm: formState,
    formType: formType,
    selectedTheme: themeMode,
    selectedPage: pageState,
    studentSelectedPage: studentPageState,
    employeeSelected: employeeSelect,
    openSnackEmp: openEmployeeTable,
    snackStatusEmp: statusEmployeeTable,
    snackMessageEmp: messageEmployeeTable,
    addForm: addFormFor,
    subjectSelected: subjectSelect,
    addFormSub: addFormSub,
    addFormFaculty: addFaculty,
    addFormFee: addFormFees,
    addFormCourse: addCourse,
    addFormSection: addSection,
    addFormAcademicYear: addFormAcadYear,
    sectionSelected: sectionSelect,
    addFormProfessor: addProfessor,
    professorSelected: professorSelect,
    studentSelected: studentSelect,
    addFormStudent: addStudent,
    scheduleSelection: scheduleSelection,
    feeSelection: feeSelection,
    addFormAnnouncement: addFormAnnouncement,
  },
})