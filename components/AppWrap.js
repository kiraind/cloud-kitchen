import Head from 'next/head'

const AppWrap = ({
    children,
    loading,
    title='',
    modal=null
}) => {

    return (
        <div
            className="AppWrap"
        >
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>{title ? `${title} — ` : ''}CloudKitchen</title>
            </Head> 
            
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
                    max-width: 400px;
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