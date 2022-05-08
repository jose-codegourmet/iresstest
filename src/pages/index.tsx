import React from 'react';
import { Provider } from 'react-redux';
import '@/styles/main.scss';

import store from '@/store';

import { GRID_SIZE } from '@/contstants';

import Title from '@/components/Title';
import Simulator from '@/components/Simulator';

export default function Home() {
  return (
    <Provider store={store}>
      <main>
        <Title>Iress Robot Exam</Title>
        <Simulator gridSize={GRID_SIZE} />
      </main>
    </Provider>
  );
}
