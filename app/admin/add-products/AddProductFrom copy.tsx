'use client'

import CategoryInput from "@/components/inputs/CategoryInput";
import CustomCheckBox from "@/components/inputs/CustomCheckBox";
import Input from "@/components/inputs/Input";
import SelectColor from "@/components/inputs/SelectColor";
import TextArea from "@/components/inputs/TextArea";
import Button from "@/components/products/Button";
import Heading from "@/components/products/Heading";
import firebaseApp from "@/lib/firebase";
// import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import axios from "axios";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import SelectFile from "@/components/inputs/SelectFile";

export type ImageType = {
    color: string
    colorCode: string
    image: File | null
}

export type UploadedImageType = {
    color: string
    colorCode: string
    image: File | null
}

interface AddProductFromProps {
    categories: Category[]
}

const AddProductFrom: React.FC<AddProductFromProps> = ({ categories }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState<ImageType[] | null>()
    const [isProductCreated, setIsProductCreated] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: '',
            inStock: false,
            images: [],
            price: '',
            book: ''
        }
    })

    useEffect(() => {
        setCustomValue('images', images)
    }, [images])

    useEffect(() => {
        if (isProductCreated) {
            reset()
            setImages(null)
            setIsProductCreated(false)
        }
    }, [isProductCreated])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // upload images to firebase
        // save product to mongodb
        setIsLoading(true)
        let uploadedImages: UploadedImageType[] = []

        if (!data.category) {
            setIsLoading(false)
            return toast.error('Category is not selected')
        }

        if (!data.images || data.images.length === 0) {
            setIsLoading(false)
            return toast.error('No selected Image!')
        }

        if (!data.images || data.images.length === 0) {
            setIsLoading(false)
            return toast.error('No selected File!')
        }

        const handleImageUploads = async () => {
            toast('Create product, please wait...')
            try {
                for (const item of data.images) {
                    if (item.image) {
                        const fileName = new Date().getTime() + '-' + item.image.name
                        const storage = getStorage(firebaseApp)
                        const storageRef = ref(storage, `products/${fileName}`)
                        const uploadTask = uploadBytesResumable(storageRef, item.image)

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                        case 'paused':
                                            console.log('Upload is paused');
                                            break;
                                        case 'running':
                                            console.log('Upload is running');
                                            break;
                                    }
                                },
                                (error) => {
                                    console.log('Error uploading image', error)
                                    reject(error)
                                },
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item,
                                            image: downloadURL
                                        })
                                        console.log('File available at', downloadURL);
                                        resolve()
                                    }).catch((error: any) => {
                                        console.log("Error getting the download URL", error)
                                        reject(error)
                                    });
                                }
                            )
                        })
                    }
                }
            } catch (error) {
                setIsLoading(false)
                console.log('Error handling image upload', error)
                return toast.error('Error handling image upload')
            }
        }

        await handleImageUploads()
        const productData = {
            ...data, images: uploadedImages
        }

        console.log(productData)

        axios.post('/api/product', productData).then(() => {
            toast.success('Product created')
            setIsProductCreated(true)
            router.refresh()
        }).catch((error) => {
            console.log(error)
            toast.error("Something went wrong when saveing product to db")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const category = watch("category")
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) {
                return [value]
            }

            return [...prev, value]
        })
    }, [])
    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (prev) {
                const filteredImages = prev.filter((item) => { item.color !== value.color })
                return filteredImages
            }
            return prev
        })
    }, [])



    const [isSelected, setIsSelected] = useState(false)
    const [filePdf, setFilePdf] = useState<File | null>(null)

    useEffect(() => {
        if (isProductCreated) {
            setFilePdf(null)
        }
    }, [isProductCreated])

    const handleFilePDFChange = useCallback((value: File) => {
        setFilePdf(value)
    }, [])


    return (<>
        <Heading title="Add a Product" center />
        <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input
            id="price"
            label="Price"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="number"
        />
        <Input
            id="brand"
            label="Publisher"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <TextArea
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <CustomCheckBox
            id="inStock"
            register={register}
            label="This product is in stock"
        />

        <div className="w-full font-medium">
            <div className="mb-2 font-semibold">Select a Category</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => {
                    if (item.name === 'All') {
                        return null
                    }

                    return (
                        <div key={item.name}
                            className="col-span"
                        >
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.name}
                                label={item.name}
                            />
                        </div>
                    )
                })}
            </div>
        </div>

        <div className="w-full flex flex-col flex-wrap gap-4">
            <div>
                <div className="font-bold">
                    Select the advertising page of the product and upload their images.
                </div>
                <div className="text-sm">
                    You'll need to upload an image for each page selected otherwise your page selection will be ignored.
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {colors.map((item, index) => {
                    return (<SelectColor
                        key={index}
                        item={item}
                        addImageToState={addImageToState}
                        removeImageFromState={removeImageFromState}
                        isProductCreated={isProductCreated}
                    />)
                })}
            </div>
        </div>

        <div className="w-full flex flex-col flex-wrap gap-4">
            <div>
                <div className="font-bold">
                    Select the book (PDF).
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
                {!filePdf &&
                    <SelectFile
                        handleFileChange={handleFilePDFChange}
                    />
                }
                {
                    filePdf &&
                    (
                        <div className="flex felx-row gap-2 text-sm col-span-2 items-center">
                            <p>{filePdf?.name}</p>
                            <div className="w-70px">
                                <Button
                                    label="Cancel"
                                    small
                                    outline
                                    onClick={() => {
                                        setFilePdf(null)
                                    }}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        <Button
            label={isLoading ? "Loading..." : "Add Product"}
            onClick={handleSubmit(onSubmit)}
        />
    </>);
}

export default AddProductFrom;