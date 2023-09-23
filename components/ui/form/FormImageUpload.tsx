'use client'

import {
    Control, 
    FieldPathValue, 
    FieldValues, 
    Path, 
    PathValue
} from "react-hook-form";
import {
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from "@/components/ui/form"
;
import ImageUpload from "@/components/imageUpload/ImageUpload";

interface IFormImageUploadProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string | React.ReactNode;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    onChangeTrigger?: (newValue: string) => void;
    onDelete?: () => void;
}

const FormImageUpload = <T extends FieldValues>({
    name,
    control,
    label,
    disabled,
    defaultValue,
    onChangeTrigger,
    onDelete
}: IFormImageUploadProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
                <FormItem className={'space-y-0 flex flex-col gap-2'}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <ImageUpload
                            values={field?.value?.map((image: any) => image.url)}
                            disabled={disabled}
                            onChange={(url) => {
                                field.onChange([...field.value, { url }] as FieldPathValue<FieldValues, string>)
                                onChangeTrigger && onChangeTrigger(url)
                            }}
                            onRemove={(url) => {
                                field.onChange([...field.value.filter((current: any) => current.url !== url)] as FieldPathValue<FieldValues, string>)
                                onDelete && onDelete()
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormImageUpload;