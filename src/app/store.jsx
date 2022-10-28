import { configureStore } from '@reduxjs/toolkit'
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

export const store = configureStore({
  reducer: {
    user: userInfo,
    isOpen: menuState,
    isOpenForm: formState,
    formType: formType,
    selectedTheme: themeMode,
    selectedPage: pageState,
    employeeSelected: employeeSelect,
    openSnackEmp: openEmployeeTable,
    snackStatusEmp: statusEmployeeTable,
    snackMessageEmp: messageEmployeeTable,
    addForm: addFormFor,
    subjectSelected: subjectSelect,
    addFormSub: addFormSub,
    addFormFaculty: addFaculty,
    addFormCourse: addCourse,
    addFormSection: addSection,
    sectionSelected: sectionSelect,
    addFormProfessor: addProfessor,
    professorSelected: professorSelect,
  },
})