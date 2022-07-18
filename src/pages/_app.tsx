import { ReactElement, ReactNode, useState } from "react";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/config/theme";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import NProgress from "next-nprogress/component";
import { ReactQueryDevtools } from "react-query/devtools";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout<Type = any> = NextPage<Type> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<any>;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <DefaultSeo {...SEO} />
      <ToastContainer />
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              {getLayout(<Component {...pageProps} />)}
              <NProgress
                color={"black"}
                options={{ easing: "ease", speed: 500 }}
                spinner={true}
              />
              <ReactQueryDevtools
                position="bottom-right"
                initialIsOpen={false}
              />
            </Hydrate>
          </QueryClientProvider>
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
