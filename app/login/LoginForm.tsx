
"use client"

import { useEffect, useState } from "react";
import Input from "../../components/inputs/Input";
import Heading from "../../components/products/Heading";
import { register } from "module";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "../../components/products/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps {
    currentUser: SafeUser | null
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {

    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({})

    const router = useRouter()

    useEffect(() => {
        if (currentUser) {
            router.push('/cart')
            router.refresh()
        }
    }, [])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false)
            if (callback?.ok) {
                router.push('/cart')
                router.refresh()
                toast.success('Logged In')
            }

            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    if (currentUser) {
        return <p className="text-center">Logged in. Redirecting...</p>
    }

    return (
        <>
            <Heading title="Sing in to Whitebook" />
            <Button
                outline
                label="Sign up with Google"
                icon={AiOutlineGoogle}
                onClick={() => { signIn('google') }}
            />
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button label={isLoading ? "Loading" : "Login"} onClick={handleSubmit(onSubmit)} />
            <p>
                Do not have an account?&nbsp;
                <Link href='/register' className='underline'>
                    Sign up
                </Link>
            </p>
        </>);
}

export default LoginForm;