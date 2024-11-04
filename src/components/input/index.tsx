import {
    FormControl,
    Input as ChakraInput,
    FormLabel,
    FormErrorMessage,
    InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import React, { forwardRef } from 'react';

interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
        Pick<ChakraInputProps, 'size'> {
    label: string;
    error?: string;
    size?: 'sm' | 'md' | 'lg';
    autocomplete?: string;
}

export const StandardInput = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, size = 'md', ...props }, ref) => {
        return (
            <FormControl isInvalid={!!error}>
                <FormLabel>{label}</FormLabel>
                <ChakraInput ref={ref} size={size} {...props} />
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
        );
    },
);

StandardInput.displayName = 'StandardInput';
