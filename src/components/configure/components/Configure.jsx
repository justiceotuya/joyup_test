import React from 'react';
import Layout from '../../layout';
import construction from '../../../assets/under_construction.svg'
import classes from './Configure.module.css'

const Configure = () => {

    const { configure__container } = classes
    return (
        <Layout>
            <div className={configure__container}>
                <img src={construction} alt="construction" />
            </div>
        </Layout >
    )
}

export default Configure
