import React from 'react';
import { Toaster } from 'react-hot-toast';
import PageTitle from './component/PageTitle';
import styles from './styles/modules/app.module.scss';
import AppHeader from './component/AppHeader';
import AppContent from './component/AppContent';
import TodoModal from './component/TodoModal';

function App() {
  return (
    <>
      <div className="container">
        <PageTitle>TODO LIST</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
          <TodoModal />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  );
}

export default App;
