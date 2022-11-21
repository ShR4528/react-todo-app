import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import styles from '../styles/modules/modal.module.scss';
import './TodoModal.css';
import Button from './Button';
import { addTodo, updateTodo } from '../slices/todoSlice';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }
    if (title && status) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Task Added Successfully');
      }
      if (type === 'update') {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
            })
          );
        } else {
          toast.error('No Changes Made');
          return;
        }
      }
      setModalOpen(false);
    }
  };
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'}
                TODO
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="type">
                Status
                <select
                  id="type"
                  defaultValue={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Complete</option>
                </select>
              </label>
              <label htmlFor="start">
                Start date:
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  defaultValue="yyyy-MM-dd"
                  min="2022-01-01"
                  max="2222-01-01"
                />
              </label>

              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Task' : 'Update Task'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
