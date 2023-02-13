import React, { MutableRefObject } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

interface Props {
  icon: React.ReactNode;
  onClick: () => void;
}

interface FocusableElement extends HTMLElement {
  focus: () => void;
}

const DeleteAlertDialog: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)



  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        {props.icon}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as MutableRefObject<FocusableElement>}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Entier List
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to delete the list?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef as MutableRefObject<HTMLButtonElement>} onClick={onClose}>
                Cancel
              </Button>

              <Button colorScheme="red" onClick={() => {
                props.onClick();
                onClose();
              }} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAlertDialog;
