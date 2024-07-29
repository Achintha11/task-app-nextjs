"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteTask, updateTask } from "@/src/features/task/taskSlice";

const TaskItem = ({ task }) => {
  const { title, date, description, isCompleted, isImportant, id } = task;
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{date}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => dispatch(updateTask({ id, isCompleted: false }))}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => dispatch(updateTask({ id, isCompleted: true }))}
          >
            Incomplete
          </button>
        )}
        <button className="edit">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="delete"
          onClick={() => dispatch(deleteTask(task.id))}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </TaskItemStyled>
  );
};

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default TaskItem;
