'use client';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { cn } from '@/libs/utils';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import Link from 'next/link';

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const { form, onSubmit, isPending } = useRegisterForm();

	return (
		<div className={cn('w-full', className)} {...props}>
			<Card className="gap-0 rounded-[12px] border-none bg-white/95 py-0 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.4)] backdrop-blur-sm">
				<CardHeader className="items-center space-y-1.5 px-4 pb-3 pt-5 text-center sm:space-y-2 sm:px-6 sm:pb-4 sm:pt-6">
					<CardTitle className="text-lg font-semibold text-slate-800 sm:text-xl">
						Welcome
					</CardTitle>
					<CardDescription className="text-xs leading-relaxed text-blue-600 sm:text-sm">
						Enter your credentials to register
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
									name="username"
									render={({ field }) => (
										<FormItem className="grid gap-1.5">
											<FormLabel
												className={cn(
													'text-xs font-medium text-neutral-950 sm:text-sm',
													isPending && 'opacity-60'
												)}
											>
												Username
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													autoComplete="username"
													className={cn(
														'h-10 rounded-lg border-neutral-300 bg-white sm:h-11 filter drop-shadow-sm',
														isPending && 'text-muted-foreground'
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
									name="email"
									render={({ field }) => (
										<FormItem className="grid gap-1.5">
											<FormLabel
												className={cn(
													'text-xs font-medium text-neutral-950 sm:text-sm',
													isPending && 'opacity-60'
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
														'h-10 rounded-lg border-neutral-300 bg-white sm:h-11 filter drop-shadow-sm',
														isPending && 'text-muted-foreground'
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
													'text-xs font-medium text-neutral-950 sm:text-sm',
													isPending && 'opacity-60'
												)}
											>
												Password
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="password"
													autoComplete="new-password"
													className={cn(
														'h-10 rounded-lg border-neutral-300 bg-white sm:h-11 filter drop-shadow-sm',
														isPending && 'text-muted-foreground'
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
									name="confirmPassword"
									render={({ field }) => (
										<FormItem className="grid gap-1.5">
											<FormLabel
												className={cn(
													'text-xs font-medium text-neutral-950 sm:text-sm',
													isPending && 'opacity-60'
												)}
											>
												Confirm Password
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="password"
													autoComplete="new-password"
													className={cn(
														'h-10 rounded-lg border-neutral-300 bg-white sm:h-11 filter drop-shadow-sm',
														isPending && 'text-muted-foreground'
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
								{isPending ? 'Signing up...' : 'Sign up'}
							</Button>
						</form>
					</Form>
				</CardContent>
				<Separator className="mx-4 bg-slate-200 sm:mx-6" aria-hidden />
				<CardFooter className="flex flex-col items-center gap-3 px-4 pb-5 pt-4 text-sm sm:gap-4 sm:px-6 sm:pb-6 sm:pt-5">
					<button
						type="button"
						className="flex items-center gap-2 text-xs font-medium text-blue-600 transition-colors hover:text-blue-600/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 sm:text-sm"
					>
						<FcGoogle size={26} color="red" />
						<span>Sign up with Google</span>
					</button>
					<p className="text-center text-xs text-slate-600 sm:text-sm">
						Already have an account?{' '}
						<Link
							href="/auth/login"
							className="font-semibold text-blue-600 hover:text-blue-600/80"
						>
							Login
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
