import Head from 'next/head'

import Header from './Header.js'

const AppWrap = ({
    children,
    loading,
    title='',
    header=false,
    headerText='Профиль',
    headerLink='/profile',
    modal=null
}) => {

    return (
        <div
            className="AppWrap"
        >
            <Head>
                <link rel="icon" href="/favicon.svg" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#ff5722"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>{title ? `${title} — ` : ''}CloudKitchen</title>
            </Head>

            { header && (
                <Header
                    text={headerText}
                    link={headerLink}
                />
            ) }
            
            <main>{children}</main>

            <style jsx global>{`
                body {
                    margin: 0;
                    padding: 0;
                    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                }

                .AppWrap main {
                    margin: 0 auto;
                    width: 100%;
                    max-width: 450px;
                }

                h3 {
                    margin: 20px 15px 0;
                    font-size: 18px;
                }

                @media (min-width: 440px) {
                    .AppWrap main {
                        margin: 20px auto 0;
                    }
                }    
            `}</style>
        </div>
    )
}

export default AppWrap