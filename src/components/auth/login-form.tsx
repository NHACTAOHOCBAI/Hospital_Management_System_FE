import { Link } from "react-router-dom";
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
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginForm } from "@/pages/auth/login/useLoginForm";
import { useLoginUser } from "@/hooks/queries/useLoginUser";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form } = useLoginForm();
  const loginMutation = useLoginUser();
  const isPending = loginMutation.isPending;

  // Xử lý submit
  const onSubmit = async (values: { email: string; password: string }) => {
    await loginMutation.mutateAsync(values, {
      onError: (error: any) => {
        // Hiển thị lỗi dưới input
        form.setError("email", {
          message: error?.response?.data?.message || "Login failed",
        });
        form.setError("password", {
          message: error?.response?.data?.message || "Login failed",
        });
      },
    });
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <Card className="gap-0 rounded-[12px] border-none bg-white/95 py-0 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)] backdrop-blur-sm">
        <CardHeader className="items-center space-y-1.5 px-4 pb-3 pt-5 text-center sm:space-y-2 sm:px-6 sm:pb-4 sm:pt-6">
          <CardTitle className="text-lg font-semibold text-slate-800 sm:text-xl">
            Welcome
          </CardTitle>
          <CardDescription className="text-xs leading-relaxed text-blue-600 sm:text-sm">
            Enter your credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0 sm:px-6 sm:pb-5">
          <Form {...form}>
            <form
              className="flex flex-col gap-5 sm:gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div
                className="grid gap-3.5 text-left sm:gap-4 group"
                data-disabled={isPending}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-1.5">
                      <FormLabel
                        className={cn(
                          "text-xs font-medium text-neutral-950 sm:text-sm",
                          isPending && "opacity-60"
                        )}
                      >
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          autoComplete="email"
                          className={cn(
                            "h-10 rounded-lg border-neutral-200 bg-white sm:h-11",
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
                    <FormItem className="grid gap-1.5">
                      <FormLabel
                        className={cn(
                          "text-xs font-medium text-neutral-950 sm:text-sm",
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
                          className={cn(
                            "h-10 rounded-lg border-neutral-200 bg-white sm:h-11",
                            isPending && "text-muted-foreground"
                          )}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="h-10 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-600/90 sm:h-11 sm:text-base"
                disabled={isPending}
              >
                {isPending ? "Sign In..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <Separator className="mx-4 bg-slate-200 sm:mx-6" aria-hidden />
        <CardFooter className="flex flex-col items-center gap-3 px-4 pb-5 pt-4 text-sm sm:gap-4 sm:px-6 sm:pb-6 sm:pt-5">
          <Link
            to="/forgot-password"
            className="inline-block text-sm underline-offset-4 underline text-blue-600 hover:text-blue-600/80"
          >
            Forgot your password?
          </Link>
          <p className="text-center text-xs text-slate-600 sm:text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-600/80"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
