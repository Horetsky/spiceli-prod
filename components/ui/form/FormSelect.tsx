import {
    Control, 
    FieldValues, 
    Path, 
    PathValue
} from "react-hook-form";
import {
    Select,
    SelectContent, 
    SelectGroup,
    SelectItem, 
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from "@/components/ui/form";
import { ReactNode } from "react";

interface IFormSelectProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string | ReactNode;
    placeholder: string;
    description?: string;
    shouldUnregister?: boolean;
    onChangeTrigger?: (newValue: PathValue<T, Path<T>>) => void;
    defaultValue?: PathValue<T, Path<T>>;
    options: SelectItem[];
}

export type SelectItem = {
    label: string | React.ReactNode;
    value: string;
} | {
    label: 'separator',
    value: 'separator',
}
const FormSelect = <T extends FieldValues>({
    name, 
    control, 
    label, 
    shouldUnregister = false, 
    description, 
    defaultValue, 
    options, 
    placeholder, 
    onChangeTrigger
}: IFormSelectProps<T>) => {

    return (
            <FormField
                control={control}
                name={name}
                defaultValue={defaultValue}
                shouldUnregister={shouldUnregister}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <Select
                            onValueChange={(value) => {
                                field.onChange(value as PathValue<T, Path<T>>)
                                onChangeTrigger && onChangeTrigger(value as PathValue<T, Path<T>>)
                            }}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className={"max-h-[350px] overflow-y-scroll"}>
                                <SelectGroup>
                                    <SelectLabel>{label}</SelectLabel>
                                    {
                                        options.map((option, index) => (
                                            <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                        )
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {
                            description &&
                                <FormDescription>{ description }</FormDescription>
                        }
                        <FormMessage />
                    </FormItem>
                )}
            />
    );
};

export default FormSelect;