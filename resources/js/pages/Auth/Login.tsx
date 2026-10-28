import { Head, useForm } from "@inertiajs/react";

export default function Login() {

    const { data, setData, post, processing, errors} = useForm({
        email: '',
        password: ''
    });

		const submit = (e:React.FormEvent<HTMLFormElement>) => {
				e.preventDefault();

				post('/login');
		};

    return (
        <>
					<Head title="Login"/>
					<div className="hero min-h-[calc(100vh-16rem)]">
						<div className="hero-content flex-col">
							<div className="card w-96 bg-base-100">
								<div className="card-body">
									<h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

										<form method="POST" onSubmit={submit}>
											{/* email */}
											<label htmlFor="email" className="floating-label mb-6">
												<input 
													id="email"
													type="email" 
													placeholder="mail@example.com"
													value={data.email}
													className={`input input-bordered ${errors.email? 'input-error':''}`}
													required={true}
													autoFocus={true}
													onChange={(e) => setData('email', e.target.value)}
												/>
													<span>Email</span>
												</label>
												{errors.email && (
												<div className="label -mt-4 mb-2">
													<span className="label-text-alt text-error">{errors.email}</span>
												</div>
												)}

												{/*-- Password --*/}
												<label htmlFor="password" className="floating-label mb-6">
													<input
														type="password" 
														id="password" 
														placeholder="••••••••"
														className={`input input-bordered ${errors.password? 'input-error':''}`}
														value={data.password}
														onChange={(e) => setData('password', e.target.value)}
														required={true}
													/>
													<span>Password</span>
												</label>
												{errors.password && (
												<div className="label -mt-4 mb-2">
													<span className="label-text-alt text-error">{errors.password}</span>
												</div>
												)}

												{/*!-- Remember Me --*/}
												<div className="form-control mt-4">
													<label className="label cursor-pointer justify-start">
														<input type="checkbox" name="remember" className="checkbox"/>
														<span className="label-text ml-2">Remember me</span>
													</label>
												</div>

												{/*-- Submit Button --*/}
												<div className="form-control mt-8">
													<button type="submit" disabled={processing} className="btn btn-primary btn-sm w-full">
														{processing? 'Logging in...' : 'Login'}
													</button>
												</div>
										</form>

										<div className="divider">OR</div>
										<p className="text-center text-sm">
											Don't have an account?
											<a href="/register" className="link link-primary">Register</a>
										</p>
								</div>
							</div>
						</div>
					</div>
        </>
    )
}