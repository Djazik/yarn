import { useEffect, useState } from "react";
import { request } from "../../services";
import { HomeCard } from "../../components/card/home-card";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setSelected,
  setTodos,
} from "../../redux/slices/todoSlices";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Loading } from "../../components/loading";

export const HomePage = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const openModal = () => {
    dispatch(setSelected(null));
    setShow(true);
    reset({ firstName: "", profession: "", age: "", gender: "", avatar: "" });
  };
  const closeModal = () => {
    setShow(false);
  };
  const todo = useSelector((state) => state.todo.todos);
  const selected = useSelector((state) => state.todo.selected);
  const loading = useSelector((state) => state.todo.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await request("/todo");
      dispatch(setTodos(data));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const onSubmit = async (values) => {
    try {
      dispatch(setLoading(true));
      if (selected === null) {
        await request.post("/todo", values);
      } else {
        await request.put(`/todo/${selected}`, values);
      }
      getData();
      setShow(false);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const deleteUser = async (id) => {
    try {
      dispatch(setLoading(true));
      await request.delete(`/todo/${id}`);
      getData();
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const editUser = async (id) => {
    dispatch(setSelected(id));
    setShow(true);
    const { data } = await request(`/todo/${id}`);
    reset(data);
  };
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-5">
          <h1>{todo.length}</h1>
          <div>
            <input
              type="text"
              placeholder="Searching"
              className="search-input"
            />
          </div>
          <button onClick={openModal} className="btn btn-primary py-2 px-4">
            Add
          </button>
        </div>
        <div>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
            {loading ? (
              <Loading />
            ) : (
              todo.map((item) => (
                <HomeCard
                  key={item.id}
                  deleteUser={deleteUser}
                  editUser={editUser}
                  {...item}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div>
        <Modal show={show} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Add user</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body className="d-flex flex-column gap-4">
              <Form.Group as={Col} md="8" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="todo-input"
                  required
                  type="text"
                  placeholder="Name"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <span className="text-danger">
                    This field is required firstName
                  </span>
                )}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="8" controlId="validationCustom01">
                <Form.Label>Profession</Form.Label>
                <Form.Control
                  className="todo-input"
                  required
                  type="text"
                  placeholder="Profession"
                  {...register("profession", { required: true })}
                />
                {errors.profession && (
                  <span className="text-danger">
                    This field is required profession
                  </span>
                )}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="8" controlId="validationCustom01">
                <Form.Label>Image Url</Form.Label>
                <Form.Control
                  className="todo-input"
                  required
                  type="url"
                  placeholder="Url"
                  {...register("avatar", { required: true })}
                />
                {errors.avatar && (
                  <span className="text-danger">
                    This field is required avatar
                  </span>
                )}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="8" controlId="validationCustom01">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  className="todo-input"
                  required
                  type="number"
                  placeholder="Age"
                  {...register("age", { required: true })}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="8" controlId="validationCustom01">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  {...register("gender", { required: true })}
                  aria-label="Default select example"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                {selected === null ? "Add User" : "Save User"}
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default HomePage;
