import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import type { AppProps } from 'next/app'
import { Manrope } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
})

function App({ Component, pageProps, router }: AppProps) {
  const noLayout = router.pathname.startsWith("/dashboard");

  return (
    <Provider store={store}>
      <div className={manrope.className}>
        {!noLayout && <Header />}
        <Component {...pageProps} />
        {!noLayout && <Footer />}
      </div>
    </Provider>
  )
}

export default App
