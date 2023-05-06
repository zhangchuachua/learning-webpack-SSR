import React, { useEffect } from 'react';
import classnames from 'classnames/bind';
import styles from './HelloWorld.module.scss';

const cx = classnames.bind(styles);

console.log(styles['hello-world'])

const HelloWorld = ({}) => {
  useEffect(() => {
    console.log(styles);
  })

  return (
    <div className={styles['hello-world']}>
      Hello World
    </div>
  );
};

export default HelloWorld;