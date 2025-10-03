import { Link } from 'react-router-dom';

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
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const googleLogo = 'http://localhost:3845/assets/9e5f28a1e0fd46cb4783a0a2edc868f4539a0632.png';

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

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
					<form className="flex flex-col gap-5 sm:gap-6" onSubmit={handleSubmit}>
						<div className="grid gap-3.5 text-left sm:gap-4">
							<div className="grid gap-1.5">
								<Label
									htmlFor="username"
									className="text-xs font-medium text-neutral-950 sm:text-sm"
								>
									Username
								</Label>
								<Input
									id="username"
									name="username"
									autoComplete="username"
									className="h-10 rounded-lg border-neutral-200 bg-white sm:h-11"
									required
								/>
							</div>
							<div className="grid gap-1.5">
								<Label
									htmlFor="email"
									className="text-xs font-medium text-neutral-950 sm:text-sm"
								>
									Email
								</Label>
								<Input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									className="h-10 rounded-lg border-neutral-200 bg-white sm:h-11"
									required
								/>
							</div>
							<div className="grid gap-1.5">
								<Label
									htmlFor="password"
									className="text-xs font-medium text-neutral-950 sm:text-sm"
								>
									Password
								</Label>
								<Input
									id="password"
									name="password"
									type="password"
									autoComplete="new-password"
									className="h-10 rounded-lg border-neutral-200 bg-white sm:h-11"
									required
								/>
							</div>
							<div className="grid gap-1.5">
								<Label
									htmlFor="confirmPassword"
									className="text-xs font-medium text-neutral-950 sm:text-sm"
								>
									Confirm Password
								</Label>
								<Input
									id="confirmPassword"
									name="confirmPassword"
									type="confirmPassword"
									autoComplete="new-password"
									className="h-10 rounded-lg border-neutral-200 bg-white sm:h-11"
									required
								/>
							</div>
						</div>
						<Button
							type="submit"
							className="h-10 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-600/90 sm:h-11 sm:text-base"
						>
							Sign up
						</Button>
					</form>
				</CardContent>
				<Separator className="mx-4 bg-slate-200 sm:mx-6" aria-hidden />
				<CardFooter className="flex flex-col items-center gap-3 px-4 pb-5 pt-4 text-sm sm:gap-4 sm:px-6 sm:pb-6 sm:pt-5">
					<button
						type="button"
						className="flex items-center gap-2 text-xs font-medium text-blue-600 transition-colors hover:text-blue-600/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 sm:text-sm"
					>
						<img
							src={googleLogo}
							alt="Google icon"
							className="h-4 w-4 sm:h-5 sm:w-5"
							loading="lazy"
						/>
						<span>Sign up with Google</span>
					</button>
					<p className="text-center text-xs text-slate-600 sm:text-sm">
						Already have an account?{' '}
						<Link
							to="/login"
							className="font-semibold text-blue-600 hover:text-blue-600/80"
						>
							Log in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
