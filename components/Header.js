import Router from 'next/router'

import { Button } from '@material-ui/core'

import Logo from '../components/Logo.js'

const Header = () => (
    <header>
        <Logo
            size={36}
            shadow={false}
        />

        <Button
            variant="outlined"
            color="secondary"
            onClick={() => Router.push('/profile')}
        >Профиль</Button>

        <style jsx>{`
            header {
                padding: 0 15px;
                height: 60px;
                box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);

                display: flex;
                align-items: center;
                justify-content: space-between;
            }    
        `}</style>
    </header>
)

export default Header