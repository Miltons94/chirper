import { Head, useForm } from '@inertiajs/react'
export default function Register() {
  const { data, setData, post, processing, errors} = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const submit = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/register');

  };

  return (
    <>
      <div className="hero min-h-[calc(100vh-16rem)]">
        <div className="hero-content flex-col">
          <div className="card w-96 bg-base-100">
            <div className="card-body">
              <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

              <form method="POST" onSubmit={submit}>

                {/* Name */}
                <label htmlFor="name" className="floating-label mb-6">
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    value={data.name}
                    className={`input input-bordered ${errors.name? 'input-error' :'' }`}
                    required={true}
                    onChange={(e) => setData('name', e.target.value)}
                  />
                    <span>Name</span>
                </label>
                {errors.name &&(
                <div className="label -mt-4 mb-2">
                  <span className="label-text-alt text-error">{errors.name}</span>
                </div>
                )}

                {/* Email */}
                <label htmlFor="email" className="floating-label mb-6">
                  <input 
                    type="email"
                    id="email" 
                    placeholder="mail@example.com"
                    value={data.email}
                    className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                    required={true}
                    onChange={(e) => setData('email', e.target.value)}
                  />
                  <span>Email</span>
                </label>
                {errors.email &&(
                <div className="label -mt-4 mb-2">
                  <span className="label-text-alt text-error">{errors.email}</span>
                </div>
                )}

                {/* Password */}
                <label htmlFor="password" className="floating-label mb-6">
                  <input 
                    type="password"
                    id="password" placeholder="••••••••"
                    className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                    required={true}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}

                  />
                  <span>Password</span>
                </label>
                {errors.password && (
                <div className="label -mt-4 mb-2">
                  <span className="label-text-alt text-error">{errors.password}</span>
                </div>
                )}

                {/* Password Confirmation */}
                <label htmlFor="password_confirmation" className="floating-label mb-6">
                  <input 
                    type="password" 
                    id="password_confirmation"
                    placeholder="••••••••"
                    className="input input-bordered"
                    required={true}
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                  />
                  <span>Confirm Password</span>
                </label>

                {/* Submit Button */}
                <div className="form-control mt-8">
                  <button type="submit" disabled={processing} className="btn btn-primary btn-sm w-full">
                    {processing? 'Registering...':'Register'}
                  </button>
                </div>
              </form>

              <div className="divider">OR</div>
              <p className="text-center text-sm">
                Already have an account?
                <a href="/login" className="link link-primary">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
