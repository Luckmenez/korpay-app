import { useToast } from '@chakra-ui/react';

export function useStandardToast() {
    const toast = useToast();

    return (
        message: string,
        status: 'success' | 'error' | 'info' | 'warning' = 'success',
    ) => {
        toast({
            position: 'top-right',
            title: message,
            status,
            duration: 3000,
            isClosable: true,
        });
    };
}
