import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getCsrfToken, signIn } from 'next-auth/react';
import { FormEvent } from 'react';

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    signIn('credentials', {
      username: 'omerfarooq',
      password: 'omerfarooq',
      redirect: true,
      callbackUrl: '/',
    });
  };
  return (
    <form onSubmit={(e) => handleSubmit}>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      <label>
        Email address
        <input type='email' id='email' name='email' />
      </label>
      <label>
        Password
        <input name='password' type='password' />
      </label>
      <button type='submit'>Sign in with Email</button>
    </form>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
