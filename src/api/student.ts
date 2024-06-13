import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/config";



/** Fetch enrollment details for student */
export const getEnrollmentDetails = async (departmentId: string) => {
    try {
        const { data, status } = await axiosInstance.get(`/student/enrollment/${departmentId}`);
        if (status === 200) {
            return data.data;
        } else {
            toast({
                title: "Request failed",
                description: data.message,
                variant: 'warning'
            })
        }
    } catch (error: unknown) {
        toast({
            title: "Request failed",
            description: "Application error! Please contact admin",
            variant: 'destructive'
        })
    }
}


/** create function to get student by email */
export const getStudentByEmail = async (email: string) => {
    try {
        const { data, status } = await axiosInstance.get(`/student/email/${email}`);
        if (status === 200) {
            return data.data;
        } else {
            toast({
                title: "Request failed",
                description: data.message,
                variant: 'warning'
            })
        }
    } catch (error: unknown) {
        toast({
            title: "Request failed",
            description: "Application error! Please contact admin",
            variant: 'destructive'
        })
    }
}

// TODO: get students by class id using this api GET '/class/:classId/dept/:departmentId'
export const getStudentsByClassId = async (classId: string, departmentId: string) => {
    try {
        const { data, status } = await axiosInstance.get(`/student/class/${classId}/dept/${departmentId}`);
        if (status === 200) {
            return data.data;
        } else {
            toast({
                title: "Request failed",
                description: data.message,
                variant: 'warning'
            })
        }
    } catch (error: unknown) {
        toast({
            title: "Request failed",
            description: "Application error! Please contact admin",
            variant: 'destructive'
        })
    }
}