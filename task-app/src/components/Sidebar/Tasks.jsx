"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import TaskItem from "./TaskItem";
import { getAllTasks } from "@/src/features/task/taskSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@clerk/clerk-react";
import CreateContent from "../Modals/CreateContent";
import Modal from "./Modal";
import { openModal } from "@/src/features/modal/modalSlice";

const Tasks = React.memo(({ tasks, title }) => {
  const { theme } = useSelector((store) => store.theme);
  const { modalOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  const { isSignedIn } = useUser();

  console.log("Rendering Tasks Component");

  return (
    <>
      {isSignedIn && (
        <TaskStyled theme={theme}>
          {modalOpen && <Modal content={<CreateContent />} />}

          <h1>{title}</h1>
          <div className="tasks grid">
            {tasks &&
              tasks.map((task) => <TaskItem key={task.id} task={task} />)}
            <button
              className="create-task"
              onClick={() => dispatch(openModal())}
            >
              <FontAwesomeIcon icon={faPlus} /> Add New Task
            </button>
          </div>
        </TaskStyled>
      )}
    </>
  );
});

const TaskStyled = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    position: fixed;
    top: 4.9rem;
    right: 5.1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      top: 3rem;
      right: 3.5rem;
    }
  }

  .tasks {
    margin: 2rem 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
