import type { AppProps } from 'next/app';

import 'reflect-metadata';

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: {},
  };
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="relative h-full w-full">
      <Component {...pageProps} />
    </div>
  );
}
