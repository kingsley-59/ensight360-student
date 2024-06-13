import { ColumnDef, Row } from "@tanstack/react-table"
import { DataTable } from "../dashboard/DataTable"
import { Button } from "../ui/button"
import { RegisteredCourse } from "@/types/types"
import { useCourseState } from "@/stores"



function CourseTableActions({ row }: { row: Row<RegisteredCourse> }) {
    const { setCurrentCourse } = useCourseState()

    return (
        <div className="flex gap-2">
            {/* <Button size="sm" variant="outline">Edit</Button> */}
            <Button size="sm" variant="secondary" onClick={() => setCurrentCourse(row.original.course)}>View</Button>
        </div>
    )
}

const columns: ColumnDef<RegisteredCourse>[] = [
    {
        accessorFn: row => row.course.title,
        header: 'Course'
    },
    {
        accessorFn: row => row.course.code,
        header: 'Code'
    },
    {
        accessorFn: row => row.course.units,
        header: 'Units',
    },
    {
        accessorKey: 'session',
        header: 'Session',
    },
    {
        accessorKey: 'totalScore',
        header: 'Score'
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({row}) => <CourseTableActions row={row} />
    }
]


export default function RegisteredCoursesTable({ data }: { data: RegisteredCourse[] }) {
    return (
        <div className="container !px-0 mx-auto ">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
