import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import 'styles.scss';
import 'tailwind.css';
import MainHeader from 'layouts/MainHeader';
import Inspect from 'inspx';
import { AuthProvider } from '../context/AuthContext';
import '../carousel.css';
import '../componentStyle.css';
import '../sortableTreeStyle.css';
import '../node-renderer-default.css';
import MainLayout from 'components/MainLayout';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AdminLayout from 'layouts/AdminLayout';
import { QueryCache } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
const queryCache = new QueryCache({
  onError: (error) => {
    if (
      error?.config.url !== 'https://api-staging.zalents.net/api/v4/auth' &&
      error?.data?.errors?.[0].status !== 401
    ) {
      toast.error(error?.data?.errors?.[0]?.message || 'Something went wrong');
    }
  },
});
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
  queryCache,
});

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};
export default function MyApp({ Component, pageProps, router }) {
  let isAdmin = router?.route?.includes('admin');
  const getLayout = Component.getLayout || MainLayout;
  const Header = Component.getHeader || MainHeader;
  const protectedRoute = Component.protectedRoute ?? true;
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Inspect disabled={true}>
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.main
              initial="hidden"
              animate="enter"
              exit="exit"
              variants={variants}
              transition={{ type: 'linear' }}
            >
              {typeof window !== 'undefined' ? (
                <AuthProvider
                  protectedRoute={protectedRoute}
                  isAdmin={isAdmin}
                  {...pageProps}
                >
                  {!isAdmin ? (
                    <>
                      <Header key={router.route} />
                      {getLayout(
                        <Component {...pageProps} key={router.asPath} />
                      )}
                      <Toaster
                        toastOptions={{
                          duration: 10000,
                          className: 'overflow-auto ',
                        }}
                        position="bottom-left"
                        reverseOrder={false}
                      />
                    </>
                  ) : (
                    <AdminLayout>
                      <Component {...pageProps} key={router.asPath} />
                    </AdminLayout>
                  )}
                </AuthProvider>
              ) : (
                <div className="flex items-center justify-center h-screen">
                  Loading . . .
                </div>
              )}
              <ReactQueryDevtools />
            </motion.main>
          </AnimatePresence>
        </Inspect>
      </Hydrate>
    </QueryClientProvider>
  );
}
