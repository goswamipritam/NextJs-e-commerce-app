// import "@/styles/globals.css";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// import { Provider } from 'react-redux';
// import store from '../redux/store';
// import '../styles/globals.css'; // Optional: Add global styles

// export default function MyApp({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// import React from 'react';
// import { Provider } from 'react-redux';
// import  store  from '../redux/store';
// import '../styles/globals.css';

// export default function App({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

import React from 'react';
import { Provider } from 'react-redux';
import  store  from '../redux/store';
import Navbar from '../components/navbar';
// import Footer from '../components/Footer';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </Provider>
  );
}
