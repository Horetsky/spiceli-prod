import React, {FC} from 'react';
import ReactInputMask from 'react-input-mask';
import {Input} from "@/components/ui/input";

interface IMaskInputProps {
    value: string;
    onChange: (newValue: string) => void;
    mask: string;
    maskChar?: string;
    placeholder?: string;
    disabled?: boolean
}

const MaskInput: FC<IMaskInputProps> = ({
                                            value,
                                            onChange,
                                            mask,
                                            placeholder,
                                            maskChar = '',
                                            disabled = false
                                        }) => {
    return (
        <ReactInputMask disabled={disabled}  placeholder={placeholder} mask={mask} value={value} onChange={(e) => onChange(e.target.value)} maskPlaceholder={maskChar}>
            <Input />
        </ReactInputMask>
    );
};

export default MaskInput;
