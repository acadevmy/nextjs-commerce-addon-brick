import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";

import { RootProps } from "@/appTypes/RootProps";
import LocaleSwitcher from "@/components/LocaleSwitcherSelect/LocaleSwitcher";
import { geistMono, inter } from "@/fonts";
import { routing } from "@/i18n/routing";
import ReactQueryProvider from "@/reactQuery/ReactQueryProvider";
import { getGlobalMetadata } from "@/utils/seoMetadata";
import { DEFAULT_EMPTY_STRING } from "@/utils/utilityConstants";

export const generateMetadata = async (): Promise<Metadata | null> => {
  return getGlobalMetadata(DEFAULT_EMPTY_STRING);
};

const RootLayout = async ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
}> &
  RootProps) => {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${inter.className} ${geistMono.variable} antialiased`}>
        <NextTopLoader color="#000" showSpinner={false} />

        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <LocaleSwitcher />
            {children}
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
