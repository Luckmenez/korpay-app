import {
    Box,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Select,
    chakra,
} from '@chakra-ui/react';
import React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type optionsType = {
    id: string;
    option: string;
    value: string;
};

interface SelectInputProps
    extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'size'> {
    erro?: FieldError | Merge<FieldError, FieldErrorsImpl>;
    placeholder?: string;
    label: string;
    isRequired?: boolean;
    options: optionsType[];
}

export const StandardSelectInput = React.forwardRef<
    HTMLSelectElement,
    SelectInputProps
>(
    (
        {
            label,
            erro,
            placeholder,
            isRequired,
            options,
            ...props
        }: SelectInputProps,
        ref: React.Ref<HTMLSelectElement>,
    ) => {
        return (
            <FormControl
                isInvalid={!!erro}
                variant={'floating'}
                id={props.name}
                isRequired={isRequired}
                mt={'0.6rem'}
            >
                <Box>
                    <Flex flexDir={'column'} alignContent={'end'}>
                        <FormLabel fontSize={'sm'} htmlFor={props.name}>
                            {label}
                        </FormLabel>
                        <Select
                            id="select"
                            ref={ref}
                            fontSize={'sm'}
                            placeholder={placeholder}
                            name={props.name}
                            {...props}
                        >
                            {options?.map((option) => (
                                <option value={option.value} key={option.id}>
                                    {option.option}
                                </option>
                            ))}
                        </Select>

                        <FormErrorMessage>
                            <chakra.span fontSize={'xs'}>
                                {(erro as FieldError)?.message}
                            </chakra.span>
                        </FormErrorMessage>
                    </Flex>
                </Box>
            </FormControl>
        );
    },
);

StandardSelectInput.displayName = 'StandardSelectInput';
