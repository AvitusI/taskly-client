/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useCallback } from "react"; // for caching a function
import { useDropzone } from "react-dropzone";
import { Center, Image, Input, Tooltip } from "@chakra-ui/react";

export function AvatarUploader({ imageUrl, onFieldChange, setFiles }) {
    
    // Converts an image file into a URL string that represents the image
    const convertFileToUrl = file => URL.createObjectURL(file);

    const onDrop = useCallback(acceptedFiles => { 
        setFiles(acceptedFiles);
        onFieldChange(convertFileToUrl(acceptedFiles[0]));
    }, [])

    // getRootProps -> converts a component into a drop zone
    // getInputProps -> connects a file input element to React Dropzone
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    });

    // render the uploader component
    return (
        <Center {...getRootProps()}>
            <Input {...getInputProps()} id='avatar' cursor='pointer' />
            <Tooltip label='Change your avatar'>
                <Image
                    alt='profile'
                    rounded='full'
                    h='24'
                    w='24'
                    objectFit='cover'
                    cursor='pointer'
                    mt='2'
                    src={imageUrl}
                />
            </Tooltip>
        </Center>
    );
}