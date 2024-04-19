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
import { SettingsWebInfoSchema } from "@/schemas";
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

interface ManageInfoClientProps {
  infodata: Webinfo
}

const ManageInfoClient: React.FC<ManageInfoClientProps> = ({ infodata }) => {

  console.log(infodata.id)

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsWebInfoSchema>>({
    resolver: zodResolver(SettingsWebInfoSchema),
    defaultValues: {
      name: infodata.name || undefined,
      email: infodata.email || undefined,
      phone: infodata.phone || undefined,
      facebook: infodata.facebook || undefined,
      line: infodata.line || undefined,
      advetisement: infodata.advetisement || undefined,
    }
  });

  const onSubmit = (values: z.infer<typeof SettingsWebInfoSchema>) => {
    startTransition(() => {
      webinfos(values)
        .then((data) => {
          // if (data.error) {
          //   setError(data.error);
          // }

          if (data.success) {
            // update();
            setSuccess(data.success + ' Please refresh your website for see changed');
            router.refresh()
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  }

  const router = useRouter()

  return (
    <Card className="w-[600px] pt-4">
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
                        placeholder="John Doe"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john.doe@example.com"
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="0xxxxxxxxx"
                        type="phone"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="enter your facebook name"
                        type="facebook"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="line"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Line</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="enter your line id"
                        type="line"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>
                          Admin
                        </SelectItem>
                        <SelectItem value={UserRole.USER}>
                          User
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/* {user?.isOAuth === false && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for your account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )} */}
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
              <Button
                onClick={() => { router.refresh() }}
                type="button"
              >
                Refresh
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card >
  );
}

export default ManageInfoClient;