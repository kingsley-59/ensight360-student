
import DeptSwitcher from '@/components/dashboard/DeptSwitcher';
import { MainNav } from '@/components/dashboard/MainNav';
import { UserNav } from '@/components/dashboard/UserNav';
import { useDepartmentState } from '@/stores';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';



function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {

    return (
        <div className={`
          w-fit flex gap-0 items-center p-0 bg-white
          text-xl font-bold italic font-sans 
          ${(variant == "light") ? 'text-slate-400' : 'text-slate-900'}
      `}>
            <span className="underline ">Ensight</span>
            <div className="_w-[40px] aspect-square rounded-full p-2 bg-white border-r-2 border-b-2 border-slate-900 flex items-center">
                <span className="text-xl font-bold">360</span>
            </div>
        </div>
    )
}

export default function DashboardLayout() {
    const { departmentList, refreshList } = useDepartmentState()

    useEffect(() => {
        if (!departmentList.length) {
            refreshList()
        }
    }, [departmentList.length, refreshList])

    return (
        <>
            <div className="flex flex-col pb-10">
                <div className="border-b">
                    <div className="flex h-16 items-center justify-between gap-4 px-4">
                        <Logo />
                        <div className="flex items-center gap-3">
                            <MainNav className="hidden md:flex mx-6" />
                            <DeptSwitcher className='hidden md:flex' />
                            <div className=" flex items-center space-x-4">
                                <UserNav />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex sm:hidden p-2"><DeptSwitcher /></div>
                <Outlet />
            </div>
        </>
    )
}
