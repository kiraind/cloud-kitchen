// import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from '@material-ui/core/styles'

import { ModalProvider } from 'react-hooks-async-modal'

import client from '../lib/apolloClient.js'
import materialUITheme from '../lib/materialUITheme.js'

const CloudKitchenApp = ({
    Component,
    pageProps,
    // apollo,
}) => {
    return (
        <ApolloProvider
            client={client}
        >
            <ThemeProvider
                theme={materialUITheme}
            >
                <ModalProvider>
                    <Component {...pageProps} />
                </ModalProvider>
            </ThemeProvider>
        </ApolloProvider>
    )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// CloudKitchenApp.getInitialProps = async appContext => {
//     // calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(appContext)

//     return {
//         ...appProps,
//     }
// }

export default CloudKitchenApp