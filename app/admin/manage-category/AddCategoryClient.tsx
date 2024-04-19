"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";

import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SettingsCategorySchema, SettingsWebInfoSchema } from "@/schemas";
import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { settings } from "@/actions/settings";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole, Webinfo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { webinfos } from "@/actions/webinfos";
import { categories } from "@/actions/categories";
import Heading from "@/components/products/Heading";

const AddCategoryClient = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsCategorySchema>>({
        resolver: zodResolver(SettingsCategorySchema),
        defaultValues: {
            name: undefined,
        }
    });

    const onSubmit = (values: z.infer<typeof SettingsCategorySchema>) => {
        startTransition(() => {
            categories(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }

                    if (data.success) {
                        // update();
                        setSuccess(data.success);
                        router.refresh()
                    }
                })
                .catch(() => setError("Something went wrong!"));
        });
    }

    const router = useRouter()

    return (
        <>
            <Heading title="Add Category" />
            <Card className="w-[650px] pt-4">
                <CardContent>
                    <Form {...form}>
                        <form
                            className="space-y-6"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter a name"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <div className="flex flex-row justify-between">
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card >
        </>

    );
}

export default AddCategoryClient;