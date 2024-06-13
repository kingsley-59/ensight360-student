import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCourseState, useDepartmentState } from "@/stores";
import { toast } from "../ui/use-toast";
import { registerCourse } from "@/api/course";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


function useAcademicSessions(startYear = 2010) {
    return useMemo(() => {
        const currentYear = new Date().getFullYear();
        const sessions = [];
        for (let fromYear = startYear; fromYear <= currentYear; fromYear++) {
            const toYear = fromYear + 1;
            sessions.push(`${fromYear}-${toYear}`);
        }
        return sessions;
    }, [startYear]);
}

export default function RegisterCourseDialog({ children }: { children: ReactNode }) {
    const { currentDepartment, enrollmentDetails } = useDepartmentState()
    const { courseList, refreshCourseList, refreshRegisteredCourses } = useCourseState()
    const sessions = useAcademicSessions()

    const [session, setSession] = useState(sessions[sessions.length - 1])
    const [courseId, setCourseId] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (currentDepartment?._id) {
            refreshCourseList(currentDepartment?._id)
        }
    }, [currentDepartment?._id, refreshCourseList])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!currentDepartment?._id || !enrollmentDetails?._id) {
            return toast({
                title: "Form Error",
                description: "Please select a department (at the top left corner of your screen)",
                variant: "destructive",
            })
        }

        setLoading(true)
        const result = await registerCourse(enrollmentDetails._id, courseId, session).finally(() => setLoading(false));
        if (result) {
            refreshRegisteredCourses(currentDepartment._id)
        }
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-auto no-scrollbar">
                <DialogHeader>
                    <DialogTitle>Register New Course</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="">Session</Label>
                        <Select value={session} onValueChange={value => setSession(value)} required>
                            <SelectTrigger>
                                <SelectValue placeholder='Choose session' />
                            </SelectTrigger>
                            <SelectContent>
                                {sessions.map(session => (
                                    <SelectItem key={session} value={session}>{session}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="">Course</Label>
                        <Select value={courseId} onValueChange={value => setCourseId(value)} required>
                            <SelectTrigger>
                                <SelectValue placeholder='Select a course' />
                            </SelectTrigger>
                            <SelectContent>
                                {courseList.map(course => (
                                    <SelectItem key={course._id} value={course._id}>{course.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="">Registration Number</Label>
                        <Input id="" placeholder="e.g. Mechanical Engineering" value={enrollmentDetails?.registrationNumber} readOnly />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="">Department</Label>
                        <Input id="" placeholder="e.g. Mechanical Engineering" value={currentDepartment?.name} readOnly />
                    </div>


                    <Button type="submit" variant='default' className="w-full" disabled={loading}>
                        Register course
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
