import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextGen Portfolio Studio",
  description: "NextGen Portfolio Studio",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default Layout;
