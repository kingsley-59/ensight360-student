import { getAllDepartmentClasses } from "@/api/class";
import { getAllDepartmentCourses, getRegisteredCourses } from "@/api/course";
import { getAllDepartments } from "@/api/department";
import { Class, Course, Department, Enrollment, RegisteredCourse } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface DepartmentState {
    currentDepartment: Department | null,
    setCurrentDepartment: (dept: Department) => void
    departmentList: Department[],
    refreshList: () => void,
    enrollmentDetails: Enrollment | null,
    setEnrollmentDetails: (data: Enrollment | null) => void
}

export const useDepartmentState = create<DepartmentState>()(
    persist(
        (set) => ({
            currentDepartment: null,
            departmentList: [],
            setCurrentDepartment: (dept) => set((state) => ({
                ...state, currentDepartment: dept,
            })),
            refreshList: async () => {
                const results = await getAllDepartments();
                if (Array.isArray(results) && results.length) {
                    set((state) => ({
                        ...state, departmentList: results
                    }))
                }
            },
            enrollmentDetails: null,
            setEnrollmentDetails: (enrollment) => set((state) => ({
                ...state, enrollmentDetails: enrollment
            }))
        }),
        {
            name: 'dept-storage',
            getStorage: () => localStorage, // or sessionStorage
        }
    )
)

interface ClassState {
    currentClass: Class | null,
    setCurrentClass: (currClass: Class | null) => void,
    classList: Class[],
    refreshClassList: (department: string) => void,
}

export const useClassState = create<ClassState>((set) => ({
    currentClass: null,
    setCurrentClass: (currClass) => set((state) => ({
        ...state, currentClass: currClass,
    })),
    classList: [],
    refreshClassList: async (department) => {
        const results = await getAllDepartmentClasses(department);
        if (Array.isArray(results) && results.length) {
            set((state) => ({
                ...state, classList: results
            }))
        }
    }
}))

interface CourseState {
    currentCourse: Course | null,
    setCurrentCourse: (currCourse: Course) => void,
    courseList: Course[],
    refreshCourseList: (department: string) => void,
    registeredCourses: RegisteredCourse[],
    refreshRegisteredCourses: (department: string) => void,
}

export const useCourseState = create<CourseState>((set) => ({
    currentCourse: null,
    setCurrentCourse: (currCourse) => set((state) => ({
        ...state, currentCourse: currCourse,
    })),
    courseList: [],
    refreshCourseList: async (department) => {
        const results = await getAllDepartmentCourses(department);
        if (Array.isArray(results) && results.length) {
            console.log('courses', results)
            set((state) => ({
                ...state, courseList: results
            }))
        }
    },
    registeredCourses: [],
    refreshRegisteredCourses: async (department) => {
        const results = await getRegisteredCourses(department);
        console.log('getRegisteredCourses', results)
        if (Array.isArray(results) && results.length) {
            set((state) => ({
                ...state, registeredCourses: results
            }))
        }
    }
}))

