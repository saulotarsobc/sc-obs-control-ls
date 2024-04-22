import { ReactNode } from "react";
import Head from "next/head";

import { displayName, version, description } from "../../package.json";
const pageTitle = `${displayName} - v${version}`;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  );
}
