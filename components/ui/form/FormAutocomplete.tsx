import React, { ChangeEvent, HTMLAttributes, HTMLInputTypeAttribute, useState } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, ControllerRenderProps, FieldValues, Path, PathValue } from "react-hook-form";
import Spinner from "@/components/searchBar/spinner/Spinner";
import { MdCheck } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { cn } from "@/lib/utils";
import { LuSearch } from "react-icons/lu";

interface IFormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    searchFunc: (search: string) => void;
    selectValues: { label: string; value: string }[]
    loading: "loading" | "pending" | "error";
    label: string;
    placeholder?: string;
    description?: string;
    className?: HTMLAttributes<'div'>["className"];
    type?: HTMLInputTypeAttribute;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
}
const FormAutocomplete = <T extends FieldValues>({
    name,
    control,
    label,
    defaultValue,
    shouldUnregister = false,
    searchFunc,
    selectValues,
    loading,
    type = 'text',
    placeholder,
    description,
    disabled,
    className,
}: IFormInputProps<T>) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | undefined>(undefined)
    function handleSearch<T extends FieldValues>({ value, onChange }: ControllerRenderProps<T>) {
        return (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setValue(value)
            searchFunc(value)
            if (value === "") return setOpen(false)
            setOpen(true)
        }
    }
    function handleClear<T extends FieldValues>({ value, onChange }: ControllerRenderProps<T>) {
        return () => {
            onChange("");
            setValue("");
            setOpen(false);
        }
    }
    function renderContent<T extends FieldValues>({ value, onChange }: ControllerRenderProps<T>) {
        const handleCheck = (city: {label: string, value: string}) => {
            setOpen(false);
            setValue(city.label);
            onChange(city.value)
        }

        switch (loading) {
            case "loading":
                return <Spinner />;
            case "pending": {
                if(selectValues.length === 0) return <div>Не знайдено</div>
                else return (
                    <div className={"flex flex-col gap-y-4"}>
                        {
                            selectValues.map(item => (
                                <div
                                    className={"flex items-center cursor-pointer rounded-md justify-between hover:bg-input px-2 py-1"}
                                    onClick={() => handleCheck(item)}
                                >
                                    {item.label}
                                    <MdCheck
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </div>
                            ))
                        }
                    </div>
                )
            }
            default: return <div>Не знайдено</div>
        }
    }

    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({field}) => {
                const content = renderContent(field);
                const search = handleSearch(field);
                const clear = handleClear(field);
                const fieldLabel = selectValues.find(item => item.value === field.value)?.label
                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <div>
                                <div
                                    className={"relative select-none rounded-md flex items-center justify-between gap-x-[0.5vw] h-10 w-full border border-input px-4 py-2"}>
                                    <LuSearch className="text-customSecondary text-lg"/>
                                    <input
                                        className="w-full text-sm placeholder:customSecondary focus-visible:outline-none disabled:cursor-not-allowed"
                                        value={value ?? fieldLabel}
                                        placeholder={placeholder}
                                        onChange={search}
                                    />
                                    <div onClick={clear}>
                                        <IoIosCloseCircle className="text-customSecondary text-lg" />
                                    </div>
                                </div>


                                <div
                                    className={cn(
                                        "grid overflow-hidden transition-all ease-in-out",
                                        open ? "grid-rows-[1fr] opacity-100 pt-2 md:pt-4" : "grid-rows-[0fr] opacity-0 pt-0"
                                    )}
                                >
                                    <div className={"overflow-hidden"}>
                                        { content }
                                    </div>
                                </div>
                                {/*<div*/}

                                {/*    className={cn(*/}
                                {/*        "bg-white grid rounded-md transition-all ease-in-out overflow-hidden",*/}
                                {/*        // open ? "grid-rows-[1fr] opacity-100 pt-2 md:pt-4" : "grid-rows-[0fr] opacity-0 pt-0"*/}
                                {/*    )}*/}
                                {/*>*/}
                                {/*    { content }*/}
                                {/*</div>*/}
                            </div>
                        </FormControl>
                        {
                            description &&
							<FormDescription>{description}</FormDescription>
                        }
                        <FormMessage/>
                    </FormItem>
                )
            }}
        />
    );
};

export default FormAutocomplete;