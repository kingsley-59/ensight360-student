
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BookOpenText, ListChecks } from "lucide-react"
import { useEffect } from "react"
import { useClassState, useDepartmentState } from "@/stores"
import { useNavigate } from "react-router-dom"
import useAuthStore from "@/stores/authStore"
import { Separator } from "@/components/ui/separator"


// TODO: dummy data for accouncements containing subject, description, date and from
const sampleAnnounements = [
    {
        subject: "Important Accouncement!",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus.",
        date: "2023-05-01",
        from: "Dr. Smith",
    },
    {
        subject: "Important Accouncement!",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus.",
        date: "2023-05-01",
        from: "Dr. Smith",
    },
    {
        subject: "Lecture",
        description: "Introduction to Computer Science",
        date: "2023-05-01",
        from: "Dr. Smith",
    },
    {
        subject: "Lecture",
        description: "Introduction to Computer Science",
        date: "2023-05-01",
        from: "Dr. Smith",
    },
    {
        subject: "Impromptu test",
        description: "We'll be having a test in class by 2pm after our wednesday lecture",
        date: "2023-05-01",
        from: "Engr. Charles",
    },
]

export default function DashboardPage() {
    const navigate = useNavigate()
    const { currentDepartment } = useDepartmentState()
    const { refreshClassList } = useClassState()
    const { user } = useAuthStore()

    useEffect(() => {
        if (!currentDepartment) {
            navigate("/")
        } else {
            refreshClassList(currentDepartment?._id)
        }
    }, [currentDepartment, navigate, refreshClassList])

    return (
        <>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                </div>

                <div className="w-full grid md:grid-cols-12 gap-3 ">
                    <div className="md:col-span-8 space-y-4">
                        <div className=" grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Courses Registered
                                    </CardTitle>
                                    <BookOpenText className="h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">62</div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant={"outline"} className="w-full">
                                        View all
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Results Published
                                    </CardTitle>
                                    <ListChecks className="h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">41</div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant={"outline"} className="w-full">
                                        View all
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Classmates
                                    </CardTitle>
                                    <ListChecks className="h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">189</div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant={"outline"} className="w-full">
                                        Talk to class adviser
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Summary</CardTitle>
                                <CardDescription>See information about your account and profile.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="w-full grid md:grid-cols-2 gap-3">
                                    <div className="w-full grid gap-1">
                                        <span className="text-slate-500 font-bold">NAME</span>
                                        <p>{user?.firstname} {user?.lastname}</p>
                                    </div>
                                    <div className="w-full grid gap-1">
                                        <span className="text-slate-500 font-bold">REG. NO.</span>
                                        <p>{20160932311}</p>
                                    </div>
                                    <div className="w-full grid gap-1">
                                        <span className="text-slate-500 font-bold">EMAIL</span>
                                        <p>{user?.email}</p>
                                    </div>
                                    <div className="w-full grid gap-1">
                                        <span className="text-slate-500 font-bold">PHONE NO.</span>
                                        <p>{user?.profile.phoneNumber || "N/A"}</p>
                                    </div>
                                    <div className="w-full grid gap-1">
                                        <span className="text-slate-500 font-bold">ADRESS</span>
                                        <p>{user?.profile.address || "N/A"}</p>
                                    </div>
                                    <div className="w-full grid gap-1">
                                        <span className="text-slate-500 font-bold">BIO</span>
                                        <p>{user?.profile.bio || "N/A"}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t pt-3">
                                <div className="w-full flex justify-end">
                                    <Button variant={"outline"}>Manage Profile</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="md:col-span-4 gap-4 space-y-4">
                        <Card className="h-full">
                            <CardHeader className="px-4">
                                <CardTitle>Announcements</CardTitle>
                                <CardDescription>Check out the latest announcements</CardDescription>
                            </CardHeader>
                            <CardContent className="px-0">
                                {sampleAnnounements.map((annoucement, index, arr) => (
                                    <>
                                        <div key={index} className="w-full grid gap-1 p-3 border-t cursor-pointer hover:bg-slate-50">
                                            <p className="text-slate-500 font-bold">{annoucement.subject}</p>
                                            <p className="text-400 text-sm line-clamp-1">{annoucement.description}</p>
                                        </div>
                                        {(index == arr.length - 1) && <Separator />}
                                    </>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <div className="w-full flex justify-end">
                                    <Button variant={"outline"}>View all</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>

                </div>

            </div>
        </>
    )
}