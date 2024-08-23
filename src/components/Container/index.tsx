import { Flex } from '@chakra-ui/react';

interface ContainerProps {
    children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
    return (
        <Flex
            flexDir={'column'}
            bg={'primary.100'}
            textColor={'neutral.white'}
            px={'1rem'}
            h={'100%'}
        >
            {children}
        </Flex>
    );
}
