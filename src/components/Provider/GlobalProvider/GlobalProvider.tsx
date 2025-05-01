'use client'

import CategoryCourseProvider from "../CategoryCourseProvider/CategoryCourseProvider";
import IdCourseProvider from "../IdCourseProvider/IdCourseProvider";
import ModalProvider from "../ModalProvider/ModalProvider";


export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {


    return (
        <ModalProvider >
            <IdCourseProvider>
                <CategoryCourseProvider>
                    {children}
                </CategoryCourseProvider>
            </IdCourseProvider>
        </ModalProvider>
    );
};

