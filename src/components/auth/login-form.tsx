"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginUser } from "@/hooks/queries/useLoginUser";
import { cn } from "@/libs/utils";
import { useLoginForm } from "@/hooks/useLoginForm";
import Link from "next/link";
import { GoogleIcon } from "@/components/icons/google-icon";

export function LoginForm() {
  const { form } = useLoginForm();
  const loginMutation = useLoginUser();
  const isPending = loginMutation.isPending;

  // Xử lý submit
  const onSubmit = async (values: { email: string; password: string }) => {
    await loginMutation.mutateAsync(values, {
      onError: (error: Error) => {
        // Hiển thị lỗi dưới input
        const errorMessage = error?.message || "Login failed";
        form.setError("email", {
          message: errorMessage,
        });
        form.setError("password", {
          message: errorMessage,
        });
      },
    });
  };

  return (
    <Card className="w-[416px] border border-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.95)] rounded-[14px]">
      <CardHeader className="px-6 pb-0 pt-6">
        <CardTitle className="text-center text-base font-medium leading-4 tracking-[-0.3125px] text-neutral-950">
          Welcome
        </CardTitle>
        <CardDescription className="text-center text-base font-normal leading-6 tracking-[-0.3125px] text-[#717182]">
          Enter your credentials to access the system
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-0 pt-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel
                    className={cn(
                      "text-sm font-medium leading-[14px] tracking-[-0.1504px] text-neutral-950",
                      isPending && "opacity-60"
                    )}
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="email"
                      placeholder="Enter your email"
                      className={cn(
                        "h-9 rounded-lg border-0 bg-[#f3f3f5] px-3 py-1 text-sm tracking-[-0.1504px] text-neutral-950 placeholder:text-[#717182]",
                        isPending && "text-muted-foreground"
                      )}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel
                    className={cn(
                      "text-sm font-medium leading-[14px] tracking-[-0.1504px] text-neutral-950",
                      isPending && "opacity-60"
                    )}
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className={cn(
                        "h-9 rounded-lg border-0 bg-[#f3f3f5] px-3 py-1 text-sm tracking-[-0.1504px] text-neutral-950 placeholder:text-[#717182]",
                        isPending && "text-muted-foreground"
                      )}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-9 w-full rounded-lg bg-sky-600 text-sm font-medium leading-5 tracking-[-0.1504px] text-white hover:bg-sky-600/90"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>

            {/* OR Divider */}
            <div className="relative h-4">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-[rgba(0,0,0,0.1)]" />
              <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-white px-2">
                <p className="text-xs uppercase leading-4 text-[#717182]">or</p>
              </div>
            </div>

            {/* Sign in with Google Button */}
            <Button
              type="button"
              variant="outline"
              className="h-9 w-full gap-2 rounded-lg border border-[rgba(0,0,0,0.1)] bg-white text-sm font-medium leading-5 tracking-[-0.1504px] text-neutral-950 hover:bg-white/90"
              disabled={isPending}
            >
              <GoogleIcon />
              Sign in with Google
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t border-[rgba(0,0,0,0.1)] px-6 pb-6 pt-0">
        <div className="flex w-full items-center justify-center pt-4">
          <p className="text-center text-sm leading-5 tracking-[-0.1504px] text-[#717182]">
            Already have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-sky-600 hover:text-sky-600/80"
            >
              Log in
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
