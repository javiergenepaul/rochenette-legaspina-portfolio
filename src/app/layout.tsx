import { headers } from "next/headers";
import { ThemeProviders } from "@/components/common/theme-providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const lang = headersList.get("x-locale") ?? "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
