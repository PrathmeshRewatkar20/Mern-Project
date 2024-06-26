import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        setSignedUp(true);
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-200'>
      <div className='max-w-md w-full p-8 bg-white rounded-lg shadow-lg'>
        {signedUp ? (
          <Alert className='mb-4' color='success'>
            Successfully signed up! You can now sign in.
          </Alert>
        ) : (
          <>
            <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
              <div>
                <Label value='Your username' />
                <TextInput
                  type='text'
                  placeholder='Username'
                  id='username'
                  onChange={handleChange}
                  className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <div>
                <Label value='Your email' />
                <TextInput
                  type='email'
                  placeholder='name@company.com'
                  id='email'
                  onChange={handleChange}
                  className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <div>
                <Label value='Your password' />
                <TextInput
                  type='password'
                  placeholder='Password'
                  id='password'
                  onChange={handleChange}
                  className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <Button
                type='submit'
                disabled={loading}
                className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md'
              >
                {loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
            <div className='flex justify-between mt-4'>
              <span className='text-sm text-gray-600'>
                Have an account?{' '}
                <Link to='/sign-in' className='text-blue-500'>
                  Sign In
                </Link>
              </span>
            </div>
            {errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SignUp;
