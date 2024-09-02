import { Flex, Heading, useDisclosure, chakra } from '@chakra-ui/react';
import { StandardButton } from '../../components/Button';
import { useQuotation } from './hooks/useQuotation';
import { SendQuotationModal } from './SendQuotationModal';
import KorPayLogo from '../../assets/korpay_logo.svg';

export function Quotation() {
    const { quotationState, selectedQuotation, setSelectedQuotation } =
        useQuotation();
    const { onOpen, onClose, isOpen } = useDisclosure();

    function handleSelectQuotation() {
        setSelectedQuotation(quotationState);
        onOpen();
    }

    return (
        <Flex
            h={'100%'}
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <chakra.img py={'1rem'} src={KorPayLogo} />
            <Flex
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                border={'2px solid white'}
                borderRadius={'md'}
                p={'1rem'}
            >
                <Heading as="h5">Cotação Atual</Heading>
                <Flex
                    border={'1px solid white'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={'100%'}
                    my={'1rem'}
                >
                    <Heading as="h6" textAlign={'center'}>
                        {typeof quotationState.fx_rate === 'string'
                            ? 'Atualizando'
                            : parseFloat(quotationState.fx_rate).toFixed(4)}
                    </Heading>
                </Flex>
                <StandardButton
                    onClick={handleSelectQuotation}
                    label="Enviar Cotação"
                />
            </Flex>
            <SendQuotationModal
                isOpen={isOpen}
                onClose={onClose}
                selectedQuotation={selectedQuotation}
            />
        </Flex>
    );
}
