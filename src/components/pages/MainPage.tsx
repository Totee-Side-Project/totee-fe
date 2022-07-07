import React from 'react';
import { Counter, Modal } from '@components/atoms';
import { Banner, Categories, Search } from '@components/common';


export function MainPage() {
  return (
    <div>
      <Banner />
      <Search />
      <Categories />
    </div>
  );
}
