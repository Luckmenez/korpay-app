import {
    FormControl,
    NumberInput,
    FormLabel,
    FormErrorMessage,
    InputProps as ChakraInputProps,
    NumberInputField,
} from '@chakra-ui/react';
import React, { forwardRef } from 'react';

interface InputProps
    extends Omit<
            React.InputHTMLAttributes<HTMLInputElement>,
            'size' | 'onChange' | 'value'
        >,
        Pick<ChakraInputProps, 'size'> {
    label: string;
    error?: string;
    size?: 'sm' | 'md' | 'lg';
    value?: string | number;
    onChange?: (valueAsString: string, valueAsNumber: number) => void;
}

export const StandardNumberInput = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, size = 'md', value, onChange, ...props }, ref) => {
        const handleChange = (valueAsString: string, valueAsNumber: number) => {
            if (onChange) {
                onChange(valueAsString, valueAsNumber);
            }
        };

        return (
            <FormControl isInvalid={!!error}>
                <FormLabel>{label}</FormLabel>
                <NumberInput
                    size={size}
                    value={value || ''}
                    onChange={handleChange}
                >
                    <NumberInputField ref={ref} {...props} />
                </NumberInput>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
        );
    },
);

StandardNumberInput.displayName = 'StandardInput';
