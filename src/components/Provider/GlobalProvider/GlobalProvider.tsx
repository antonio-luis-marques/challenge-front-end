'use client'

import { AuthProvider } from "../AuthProvider/AuthProvider";
import CategoryCourseProvider from "../CategoryCourseProvider/CategoryCourseProvider";
import IdCourseProvider from "../IdCourseProvider/IdCourseProvider";
import ModalProvider from "../ModalProvider/ModalProvider";


export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    

    return (
        <AuthProvider>
            <ModalProvider >
                <IdCourseProvider>
                    <CategoryCourseProvider>
                    {children}
                    </CategoryCourseProvider>
                </IdCourseProvider>
            </ModalProvider>
        </AuthProvider>
    );
};

