import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/home/footer/footer'

const withPublic = (RenderComponent) =>
    ({ title, withFooter,  ...props }) => {
        return <Fragment>
            <Helmet>
                <title>Romeospizza - {title || ''}</title>
            </Helmet>
            <RenderComponent {...props} />
            {withFooter ? <Footer /> : null}
        </Fragment>
    }

export default withPublic
