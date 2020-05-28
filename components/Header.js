import Router from 'next/router'

import { Button } from '@material-ui/core'

import Logo from '../components/Logo.js'

const Header = ({
    text,
    link
}) => (
    <>
        <header>
            <Logo
                size={36}
                shadow={false}
                onClick={() => Router.push('/')}
            />

            <Button
                variant="outlined"
                color="secondary"
                onClick={() => Router.push(link)}
            >{text}</Button>
        </header>

        <div className="HeaderFiller"/>

        <style jsx>{`
            header, .HeaderFiller {
                height: 60px;
            }

            header {
                padding: 0 15px;
                box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);

                position: fixed;
                left: 0;
                right: 0;
                background-color: white;
                z-index: 5;

                display: flex;
                align-items: center;
                justify-content: space-between;
            }    
        `}</style>
    </>
)

export default Header