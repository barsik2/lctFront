import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import uploadIcon from '../../assets/icons/upload.svg';
import stackIcon from '../../assets/icons/time.svg';
import styles from './navBar.module.css';

const NavBar: React.FC = () => {
    const loc = useLocation();
    // const linkStyle = (path: string) => ({
    //     marginRight: 12,
    //     textDecoration: loc.pathname === path ? 'underline' : 'none'
    // });

    return (
        <div className={styles.containerNavBar}>
            <div>
                <p className={styles.title}>Архивная система</p>
                <p className={styles.desc}>Ретроконверсия</p>
            </div>
            
            <nav>
                {/* <Link className={styles.link} to="/" style={linkStyle('/')}> */}
                <Link className={styles.link} to="/">
                    <img src={uploadIcon} alt="" />
                    Загрузка
                </Link>
                <Link className={styles.link} to="/stackTasks">
                    <img src={stackIcon} alt="" />
                    Очередь
                </Link>
            </nav>
        </div>
    )
}

export default NavBar;