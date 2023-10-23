"use client"

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
interface ImageUploadProps {
    value: string;
    onChange: (src: string) => void;
    disable?: boolean
}
export const ImageUpload = ({ value, onChange, disable }: ImageUploadProps) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)

    }, [isMounted]);
    if (!isMounted) {
        return null
    }
    return (
        <div className="space-y-4 w-full flex flex-col justify-center items-center">
            <CldUploadButton
            onUpload={(result:any)=>onChange(result.info.secure_url)}
                options={{
                    maxFiles: 1,
                }}
                uploadPreset="oyh66vty">
                <div className="
             p-4
             border-4
             border-dashed
             border-primary/10
             rounded-10
             hover:opacity-75
             transition
             flex
             flex-col
             space-y-2
             items-center
             justify-center
             ">
                 <div className="relative h-40 w-40 border-4 rounded-lg border-primary/10">
                    <Image
                        fill
                        alt="Upload"
                        src={value || "/next.svg"}
                        className="rounded-lg object-fill" />
                </div>
             </div>
               
            </CldUploadButton>
        </div>
    );
}
