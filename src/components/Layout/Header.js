import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>FoodFest Ktm</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src='https://www.altitudehimalaya.com/media/files/Blog/Food/Most-Popular-Nepalese-Foods.jpeg' alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
